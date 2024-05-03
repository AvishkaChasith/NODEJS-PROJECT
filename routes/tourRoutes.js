const fs = require('fs');
const express = require('express');
const router = express.Router();

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

const getAllTours = (req, res) => {
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  };
  const getTour=(req, res) => {
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
  };
  const  updateTour=(req,res)=>{
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
  }
  const createTour= (req, res) => {
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
  };
  const deleteTour=(req,res)=>{
    if(req.params.id *1 > tours.length){
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID"
      })
    }
    const id = req.params.id * 1;
    const tourToDelete= tours.find(el=> el.id === id);
    const index = tours.indexOf(tourToDelete);
    tours.splice(index,1)
  
    res.status(204).json({
      status:"succcess",
      data: null
    })
  }

router       
                .route("/")
                .get(getAllTours) 
                .post(createTour)
router
                .route("/:id")
                .get(getTour) 
                .patch(updateTour)
                .delete(deleteTour)

module.exports=router;                