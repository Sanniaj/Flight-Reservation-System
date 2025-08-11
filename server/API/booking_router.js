/** 
 * booking_router.js
 */

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; 
import Booking from "./booking.js";

const bookingRouter = express.Router();


// path to booking.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const bookingFilePath = path.join(__dirname, "../data/booking.json");



bookingRouter.post("/book", (req, res) => {
    console.log("boking request: ", req.body);

};






export default bookingRouter;










































// testing
const testFlight = {
    flight_id: 'F20008',
    departure_airport: 'LAX',
    arrival_airport: 'JFK',
    departure_date: '2025-08-17',
    departure_time: '13:20',
    price: 350
};

const testCustomerInfo = {
    first_name: 'timmy',
    last_name: 'Do',
    email: 'timmy_testing@yahoo.com',
    address: '19724',
    city: 'Los Angeles',
    state: 'CA',
    zip: '92523',
    country: 'United States',
    phone: '1-239 789 2839'
};

const testSeat = '6A';

const booking = new Booking({
    flight: testFlight,
    seat: testSeat,
    customer: testCustomerInfo
});

console.log("test booking:", booking);



