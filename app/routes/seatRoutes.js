// seatRoutes.js

const express = require("express");
const seatController = require("../controllers/seatController");

const router = express.Router();

router.get("/", seatController.getAllSeats);
router.patch("/reserve", seatController.reserveSeats);

module.exports = router;
