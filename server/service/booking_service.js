/**
 * booking_service.js
 * 
 * purpose: call functions and calculate booking parameters
 *          - trim empty space from user input using cleanInput
 *          - convert email to lowercase for easier search.
 * 
 * function:
 *  = createBooking() -> create a Booking object
 *  - lookupBooking() -> find booking using customer's confirmation code and email input.
 *  - cancelBooking() -> mark a lookedup booking as canceled
 * 
 * 
 * note:
 *  - service request .json from booking_repo.js to get the data
 * 
 */




import Booking from "../domain/booking.js";
import { loadBookings } from "../repo/booking_repo.js";
import { saveBookings } from "../repo/booking_repo.js";

// remove empty space from input
function cleanInput(inputValue) {
    return String(inputValue || "").trim();
}

function fixEmailFormat(email) {
    let fixedEmail = cleanInput(email);
    fixedEmail = fixedEmail.toLowerCase();
    
    return fixedEmail;
}


/**
 * createBooking() - create and save new booking
 * 
 *  - clean input from empty space and convert email to lowercase then save to .json
 * 
 * @param {Object} bookingData - all the booking informations
 * @param {object} bookingData.flight - flight info like departure, flight_id, ect..
 * @param {string} bookingData.selectedSeat - seat selected by customer
 * @param {Object} bookingData.customer - customer info - name, address, ect..
 * 
 * @returns {Object} booking - the saved booking object 
 */
export function createBooking({ flight, selectedSeat, customer }) {

    customer.email = fixEmailFormat(customer.email);

    const booking = new Booking({ flight, selectedSeat, customer });
    const bookings = loadBookings();

    bookings.push(booking);
    saveBookings(bookings);

    return booking;
}

/**
 * Find a booking using customer's confirmation code and email
 * @param {string} confirmation - from input
 * @param {string} email - customer email from input
 * @returns the matching flight details 
 */
export function lookupBooking(confirmation, email) {
     // remove empty space using cleanInput and fixEmailFormat
    const confirmationInput = cleanInput(confirmation); 
    const emailInput = fixEmailFormat(email);

    const bookings = loadBookings();

    // loop start - check all booking
    for (let i = 0; i < bookings.length; i++) {

        const currentBooking = bookings[i];

        //compare confirmation code and email
        if (
            currentBooking.confirmation === confirmationInput && currentBooking.customer.email === emailInput
        ){
            return currentBooking; 
        }
    }

    return null;
}

/**
 * cancel a booking after searching for confirmation code and email
 * 
 * @param {string} confirmation - from input
 * @param {string} email - customer email from input
 * @returns update booking if found .. or nothing
 */
export function cancelBooking(confirmation, email) {
    const confirmationInput = cleanInput(confirmation);
    const emailInput = fixEmailFormat(email);

    const bookings = loadBookings();

    for (let i=0; i < bookings.length; i++){
        
        const booking = bookings[i];

        if (booking.confirmation === confirmationInput && booking.customer.email === emailInput) {

            // TODOset booking status to canceled
            // if booking is already canceled, return 
           if (booking.status === "CANCELED") {
                return booking;
            }

            // change status to canceled
            booking.status = "CANCELED";
            saveBookings(bookings); 
            return booking;
        }    
    }

    return null;
}

