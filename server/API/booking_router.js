/** 
 * booking_router.js
 * 
 * purpose:
 *  - create a new booking
 *  - search for booking from user inputs - confirmation code + email
 *  - can calcel booking after user search
 * 
 * 
 *  Post: /bookings    -> localhost:3000/api/bookings
 *  Get: /bookings/lookup -> localhost:3000/api/bookings/lookup
 *  Post: /bookings/cancel -> localhost:3000/api/bookings/cancel
 * 
 * 
 * parameter:
 * @param {Object} bookingData - all booking details
 * @param {Object} bookingData.flight - flight details
 * @param {string} bookingData.selectedSeat - seat chosen by customer
 * @param {Object} bookingData.customer - customer info
 * 
 * @param {string} req.query.confirmation - confirmation code from user input
 * @param {string} req.query.email - email from user input
 * 
 * @param {string} req.body.confirmation - confirmation code from user input
 * @param {string} req.body.email - email from user input
 * 
 */

import express from "express";

import { createBooking } from "../service/booking_service.js";
import { lookupBooking } from "../service/booking_service.js";
import { cancelBooking } from "../service/booking_service.js";

const bookingRouter = express.Router();

// function to trim empty space from inputs
function trimValue(value) {
  return String(value || "").trim();
}

// create new booking. should have flight details, seat number, customer info.
bookingRouter.post("/bookings", (req, res) => {

  console.log('[POST /api/bookings] body =', req.body);
  
  const flight = req.body.flight;
  const selectedSeat = trimValue(req.body.selectedSeat);
  const customer = req.body.customer;

  const bookingData = {flight, selectedSeat, customer};

  try {
    const newBooking = createBooking(bookingData);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// search for booked flights + option for cancel
bookingRouter.post("/bookings/lookup", (req, res) => {

  const confirmation = trimValue(req.body.confirmation);
  const email = trimValue(req.body.email);
  const doCancel = Boolean(req.body.doCancel);
  
  if (doCancel) {
    const canceledBooking = cancelBooking(confirmation, email);
    return res.status(200).json(canceledBooking);
  }
  
  const foundBooking = lookupBooking(confirmation, email);
  res.status(200).json(foundBooking);
});

// cancel booked flights
bookingRouter.post("/bookings/cancel", (req, res) => {
  const confirmation = trimValue(req.body.confirmation);
  const email = trimValue(req.body.email);

  const canceledBooking = cancelBooking(confirmation, email);

  res.status(200).json(canceledBooking);
});



export default bookingRouter;