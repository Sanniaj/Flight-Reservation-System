/**
 * booking.test.js
 * 
 * fundtion to test: Booking.isSeatTaken()
 *      
 * test plan: 
 *      - seat is taken, same flight, status CONFIRMED
 *      - seat is available, same flight, status confirmed
 *      - seat is taken, same flight, status canceled
 */

import Booking, { BOOKING_STATUS } from '../../domain/booking.js';



describe("booking class - isSeatTaken", () => {

    test("isSeatTaken check for same flight, same seat, status = CONFIRMED", () => {

        const bookings = [
            {
                flightId: "F100",
                selectedSeat: "1A",
                status: BOOKING_STATUS.CONFIRMED

            }
        ];

        const result = Booking.isSeatTaken(bookings, "F100", "1A");

        expect(result).toBe(true);
    });

    //different flight, same seat number, same flight status = CONFIRMED
    test("isSeatTaken check for same flight, wrong seat (1B instead of 1A), status CONFIRMED ", () => {

        const bookings = [
            {
                flightId: "F100",
                selectedSeat: "1A",
                status: BOOKING_STATUS.CONFIRMED

            }
        ];

        const result = Booking.isSeatTaken(bookings, "F100", "1B");

        expect(result).toBe(false);
    });

    test("isSeatTaken check for same flight, same seat, status CANCELED ", () => {

        const bookings = [
            {
                flightId: "F100",
                selectedSeat: "1A",
                status: BOOKING_STATUS.CANCELED

            }
        ];

        const result = Booking.isSeatTaken(bookings, "F100", "1A");

        expect(result).toBe(false);
    });

});