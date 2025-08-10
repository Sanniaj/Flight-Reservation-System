/**
 * booking.js
 * 
 * purpose: a small program to combine flight details, seat selected from customer, 
 *  and customer informatinos into one data block so we can save it to a permanent data file.
 *  
 * 2. generate a new confirmation number everytime a customer book a flight.
 * 3. we will save this to data/booking.JSON
 * 
 */
class Booking{
    constructor({ flight, seat, customer }) {

        //flight details
        this.flightId =             flight.flight_id;
        this.departure_airport =    flight.departure_airport;
        this.arrival_airport =      flight.arrival_airport;
        this.departure_date =       flight.departure_date;
        this.departure_time =       flight.departure_time;
        this.price =                flight.price;

        // Seats number
        this.seat = seat;        

        // customer's informations
        this.customer = {
            first_name:     customer.first_name,
            last_name:      customer.last_name,
            email:          customer.email,
            address:        customer.address,
            city:           customer.city,
            state:          customer.state,
            zipcode:        customer.zip,
            country:        customer.country,
            phone:          customer.phone        
        };

        // generate confirmation number
        this.confirmation = this.generateConfirmation();
    }

    generateConfirmation() {
        
        //get departure date
        const cfmDate = this.departure_date || "";
        console.log("Date:", cfmDate);

        // get departure airport
        const cfmDeparture = this.departure_airport || "";
        console.log("Airport :", cfmDeparture);

        // get flight id
        const cfmFlightID= this.flightId || "";
        console.log("FlightID:", cfmFlightID);

        // get time 
        // -TODO need to figure out a way to remove : from '10:30'
        const cfmTime = this.departure_time || "";
        console.log("Time :", cfmTime);

        // combine the suff into confirmation code.
        const confirmationCode = `CFN${cfmDate}${cfmDeparture}${cfmFlightID}${cfmTime}`;
        console.log("Confirmation number:", confirmationCode);

        return confirmationCode;
    }

}
















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