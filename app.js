const fs = require("fs");
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

//MIDDLEWARES
app.use(morgan("dev"));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));
// add own middleware
app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

//app.get("/api/v1/tours",getAllTours)
//app.post("/api/v1/tours",createTour)
//app.get("/api/v1/tours/:id", getTour)
//app.patch("/api/v1/tours/:id",updateTour)
//app.delete("/api/v1/tours/:id",deleteTour)

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
