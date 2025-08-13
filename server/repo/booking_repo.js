/**
 * 
 * booking_repository.js
 * 
 * purrpose: read + save data from booking.json
 *    
 *  function: 
 *      - loadBookings() -> read booking.json and return an array of booking objects
 *      - saveBookings(bookings) -> save array of bookings back to booking.json
 *       = lookupBooking(confirmation, email) -> search the array using findBooking()
 * 
 * important object for booking_lookup:
 *      - booking.confirmation
 *      - booking.customer.email
 * 
 *  Note:
 *      - booking.json location: /server/data/booking.json
 *      - Used in booking_router.js, booking_lookup.js
 * 
*/

import fs from "fs";
import path from "path";
import { findBooking } from "../api/booking/booking_lookup.js";

// path to our booking.json
const projectRoot = process.cwd(); //process.cwd() - current working directory - take you to our project root. ex: C:/Users/thinh/Documents/GitHub/likeag6/
const bookingFilePath = path.join(projectRoot, "server", "data", "booking.json"); // expect output: C:/Users/thinh/Documents/GitHub/likeag6/server/data/booking.json

// read booking.json and return an array -> loadBookings()
export function loadBookings() {
    const rawBookingJson = fs.readFileSync(bookingFilePath, "utf8");
    if (!rawBookingJson.trim()) return [];
    return JSON.parse(rawBookingJson);
}

// save booking array back to booking.json -> saveBookings()
export function saveBookings(bookings){
    const spacing = 2;  //declare spacing for JSON.stringify
    const rawBookingJson = JSON.stringify(bookings, null, spacing);
    
    fs.writeFileSync(bookingFilePath, rawBookingJson, "utf8");
}










// TODO lookupBooking() shouldn't be here
// look for a booking using confirmation + email -> lookupBooking()
export function lookupBooking(confirmation, email) {
    const bookings = loadBookings();
    return findBooking(bookings, confirmation, email);
}