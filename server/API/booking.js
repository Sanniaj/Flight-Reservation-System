/**
 * booking.js
 * 
 * purpose: a small program to combine flight details, seat selected from customer, 
 *  and customer informatinos into one data block so we can save it to a permanent data file.
 *  
 * 
 * 
 * 
 * 
 * 
 * reference:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
 * 
 */
class Booking{
    constructor({ flight, selectedSeat, customer }) {

        //flight details
        this.flight_Id =             flight.flight_id;
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

        // generate confirmation number
        this.confirmation = this.generateConfirmation();
    }

    generateConfirmation() {
        
        //get departure date
        const cfmDate = (this.departure_date || "").replace(/-/g, "");
        console.log("Date:", cfmDate);

        // get departure airport
        const cfmDeparture = this.departure_airport || "";
        console.log("Airport :", cfmDeparture);

        // get flight id
        const cfm_flight_id= this.flight_id || "";
        console.log("Flight_id:", cfm_flight_id);

        // get time 
        // -TODO need to figure out a way to remove : from '10:30'
        const cfmTime = (this.departure_time || "").replace(/:/g, "");
        console.log("Time :", cfmTime);

        // combine the suff into confirmation code.
        const confirmationCode = `${cfm_flight_id}-${cfmDeparture}-${cfmDate}-${cfmTime}`;
        console.log("Confirmation number:", confirmationCode);

        return confirmationCode;
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
    selectedSeat: testSelectedSeat,
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