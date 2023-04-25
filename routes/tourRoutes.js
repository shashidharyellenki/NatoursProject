const express = require('express');
const {getAllTours, createTour, getTour, updateTour,deleteTour} = require('../controllers/tourController');
const router = express.Router();



router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTour).delete(deleteTour).patch(updateTour)

module.exports = router