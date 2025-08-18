/**
 * 
 * Bookingmanager.js - booking manager class
 * 
 * 
 * 
 * 
 * 
 */


export class BookingManager {

    /**
     * totalBookings() - loop through booking array and get the maxlength of []
     * @param {*} bookings - from our booking list in booking.json
     * @returns total number of booking.
     */
    totalBookings(bookings = []) {
        return bookings.length;
    }

    totalRevenue(bookings = []) {

        let total = 0;
        
        for(let i = 0; i < bookings.length; i++) {

            const booking = bookings[i];
            const isConfirmed = (booking.status === "CONFIRMED");

            if (isConfirmed) {
                total = total + booking.price;
            }
        }
        return total;
    }

    /**
     * filterByStatus() - filter flight status to display either CONFIRMED, CANCELED, or the whole list.
     * @param {Array} bookings - array of booking objects
     * @param {String} status - either ALL, CANCELED, or CONFIRMED
     * @returns either full booking list or a list of filtered results. 
     */
    filterByStatus (bookings, status){

        // return full list of flight
        if ( status === "ALL") { 
            return bookings;
        }

        //else, return result depend on status.
        const result = [];
        for (let i = 0; i < bookings.length; i++) {
            const booking = bookings[i];

            if (booking.status === status) {
                result.push(booking);
            }
        }

        return result;
    }



    
}