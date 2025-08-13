/**
 * booking_lookup.js
 * 
 * Puropse: filter booking.json using confirmation + email and return results
 * 
 * Parameter:
 * @param {string} confirmation - confirmation Input from customer input from frontpage
 * @param {string} email - Customers email from input from frontpage
 * 
 * Return:
 *  { found: true, booking } or { found: false }
 * 
 * important object 
 *      -> booking.confirmation 
 *      -> booking.customer.email
 * 
 * flow: Frontend form -> Router -> repo.loadBookings() -> findBooking() -> router -> Frontend. 
 * 
 * ### Check:
 *  - frontend html element ID might be different from our name.
 * 
 */



export function findBooking( bookings, confirmation, email) {
    console.log("finding booking..")
    console.log("bookings passed in:", bookings.length);

    const confirmInput = String(confirmation).trim().toUpperCase();
    const emailInput = String(email).trim().toLowerCase();
    console.log("trim empty space and normalize check: ", {confirmInput, emailInput});

    //loop start
    for (let i=0; i<bookings.length; i++){

        const booking = bookings[i];

        if(booking.confirmation === confirmInput && booking.customer?.email === emailInput) {
            console.log ("match found");
            return { found: true, booking };
        }
    }
    // no match found
    console.log("uh oh, no match found");
    return { found: false };
}

