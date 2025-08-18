/**
 * booking.js
 * 
 * purpose: 
 *  - a booking class that contain flight details, seat that customer selected, and customer informations
 * 
 * 
 * 
 * function: 
 *
 *  - setStatus()
 *      @param {string} newStatus - new Booking status 
 *
 *  - getReport()
 *      @return {object} - generate a booking summary for manager
 * 
 *  - generateConfirmation()
 *      @return {string} - generate a confirmation code using flight details and booking time.
 * 
 * 
 * parameters: 
 *  
 * @param {Object} flight - the flight info
 * @param {string} flight.flight_id - flight ID
 * @param {string} flight.departure_airport - departure airport
 * @param {string} flight.arrival_airport - arrival airport
 * @param {string} flight.departure_date - date in YYYY-MM-DD
 * @param {string} flight.departure_time - time in HH:MM or HH:MM:SS
 * @param {number} flight.price - ticket price
 * 
 * @param {string} selectedSeat - seat number
 * 
 * @param {Object} customer - customer info
 * @param {string} customer.first_name - first name
 * @param {string} customer.last_name - last name
 * @param {string} customer.email - email address
 * @param {string} customer.address - street address
 * @param {string} customer.city - city name
 * @param {string} customer.state - state code
 * @param {string} customer.zip - zip code
 * @param {string} customer.country - country name
 * @param {string} customer.phone - phone number
 * 
 * @param {string} [status="confirmed"] - booking status
 * 
 * 
 * 
 * reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
 * 
 */
export const BOOKING_STATUS = {
    CONFIRMED : "CONFIRMED",
    CANCELED : "CANCELED",
}

class Booking{
    constructor({ flight, selectedSeat, customer, status }) {

        //flight details
        this.flightId =             flight.flight_id;
        this.departure_airport =    flight.departure_airport;
        this.arrival_airport =      flight.arrival_airport;
        this.departure_date =       flight.departure_date;
        this.departure_time =       flight.departure_time;
        this.price =                flight.price;

        // Seats number
        this.selectedSeat = selectedSeat;        

        // customer's informations
        this.customer = {
            first_name:     customer.first_name,
            last_name:      customer.last_name,
            email:          customer.email,
            address:        customer.address,
            city:           customer.city,
            state:          customer.state,
            zip:            customer.zip,
            country:        customer.country,
            phone:          customer.phone        
        };

        this.status = BOOKING_STATUS.CONFIRMED;


        // generate confirmation number
        this.timestamp = new Date().toISOString();
        this.confirmation = this.generateConfirmation();

    }



    // function to update flight status (flight - canceled, updated....)
    setStatus(newStatus) {
        this.status = newStatus;
    }


    // for manager to see report page. 
    getReport() {
        let fullName = this.customer.first_name + " " + this.customer.last_name;

        return{
            confirmation: this.confirmation,
            flightId: this.flightId,
            route: this.departure_airport + " to " + this.arrival_airport,
            departure_date: this.departure_date,
            departure_time: this.departure_time,
            seat: this.selectedSeat,
            customer: fullName,
            status: this.status,
            price: this.price

        };
    }


    generateConfirmation() {
        
        //get departure date
        const cfmDate = (this.departure_date || "").replace(/-/g, "");
        console.log("Date:", cfmDate);

        // get departure airport
        const cfmDeparture = this.departure_airport || "";
        console.log("Airport :", cfmDeparture);

        // get flight id
        const cfmFlightID= this.flightId || "";
        console.log("FlightID:", cfmFlightID);

        // get time 
        // // -TODO need to figure out a way to remove : from '10:30'
        // const cfmTime = (this.departure_time || "").replace(/:/g, "");
        // console.log("Time :", cfmTime);

        const date = new Date(this.timestamp);
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2,"0");
        const second = String(date.getSeconds()).padStart(2,"0");

        const cfmTime = `${hour}${minute}${second}`;

        console.log("BookingTime = ", cfmTime);

        // combine the suff into confirmation code.
        const confirmationCode = `${cfmFlightID}-${cfmDeparture}-${cfmDate}-${cfmTime}`;
        console.log("Confirmation number:", confirmationCode);

        return confirmationCode;
    }

    //BUG fix: double booking. 
    //solution: check for seat status - taken - Available
    /**
     * isSeatTaken
     * 
     * 1. check for flight
     * 2. check for seat
     * 3. check for status is not canceled
     * @param {Array} bookings 
     * @param {String} flightID 
     * @param {String} seat 
     * @returns true - new checkout with sameID, Seatnumber, and status confirmed
     *                   will not be able to checkout. 
     */
    static isSeatTaken(bookings, flightId, seat) {

        for (let i = 0; i< bookings.length; i++) {

            const booking = bookings[i] 
            const sameFlight = booking.flightId === flightId;
            const sameSeat = booking.selectedSeat === seat;
            const statusGood = booking.status !== BOOKING_STATUS.CANCELED;

            if(sameFlight && sameSeat && statusGood) {
                return true;
            }
        }
        return false;         
    }


}

export default Booking;
 











/* testing data

const testFlight = {
    flight_id: 'F20008',
    departure_airport: 'LAX',
    arrival_airport: 'JFK',
    departure_date: '2025-08-17',
    departure_time: '13:20:03',
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
    selectedSeat: testSeat,
    customer: testCustomerInfo
});

console.log("test booking:", booking);

*/

/*

//testing replace()
const paragraph = "i am timmy";
console.log(paragraph + "\n");
console.log("using replace()...\n");
console.log(paragraph.replace("timmy", "replaced words \n"));
console.log(paragraph);

const departure_date = "2025-15-19";
// const cfmDate = (departure_date || "").replace("-", "");
// console.log("Date:", cfmDate);
 
const cfmDate = (departure_date || "").replace(/-/g, "");
console.log("replace all - from date: ", cfmDate);

*/




