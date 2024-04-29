const fs = require("fs");
const express = require("express");
const app = express();

const port = 8080;
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});
app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.post("/api/v1/tours/:id",(req,res)=>{
  const id = req.params.id * 1;
  const tourToUpdate = tours.find(el => el.id === id);
  if(!tourToUpdate){
    res.status(404).json({
      status:"fail",
      message: "Invalid ID"
    })
  }
  const index = tours.indexOf(tourToUpdate);
  Object.assign(tourToUpdate,req.body);
  tours(index) = tourToUpdate;
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
    res.status(200).json({
      status: "success",
      data:{
        tour:tourToUpdate
      }
    })
  })
})

app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => {
  console.log(`App runnng on port ${port} . . .`);
});
