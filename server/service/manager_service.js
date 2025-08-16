/**
 * manager_service.js
 * 
 * purpose: 
 * 
 * 
 * parameters:
 * 
 * 
 * 
 * 
 * 
 * 
 * flow: 
 * 
 * note: we might not need service. but i made this so that 
 *      we go with our flow: frontend -> router -> service -> domain -> repo
 * 
 */


import { loadBookings } from "../repo/booking_repo.js";
import { BookingManager } from "../domain/BookingManager.js";


/**
 * getReport() - get values for manager report page
 *      
 * @returns {number} totalBookings - total number of booking
 * @returns {number} totalRevenue- total revenue from bookings
 * @returns {Array} bookings - list of all the bookings from booking.json
 */
export function getReport() {

    const bookings = loadBookings();

    const bookingmanager = new BookingManager();
    const totalBookings = bookingmanager.totalBookings(bookings);
    const totalRevenue = bookingmanager.totalRevenue(bookings);

    return {
        totalBookings: totalBookings,
        totalRevenue: totalRevenue,
        bookings: bookings
    };

}