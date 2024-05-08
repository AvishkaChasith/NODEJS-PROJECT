const express = require("express");
const tourController = require("./../controllers/tourController");
const router = express.Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour); // import that checkBody middleware to post method
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
