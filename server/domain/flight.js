/**
 * flight.js class for flight's details
 * 
 * Puropse: 
 *  - 
 * 
 */

export class Flight{
    constructor (
        flight_id,
        departure_airport,
        arrival_airport,
        departure_date,
        departure_time,
        price
    ) {
        this.flight_id = flight_id;
        this.departure_airport = departure_airport;
        this.arrival_airport = arrival_airport;
        this.departure_date = departure_date;
        this.departure_time = departure_time;
        this.price = price;
    }
    


/**
 * flightCheck()
 * check if flights data from user input match with our data
 * 
 * convert airport name toLowerCase so user can input either uppercase and lowercase. 
 * 
 * @param {string} from - departure airport form search input
 * @param { string} to - Arrival airport form search input
 * @param {string} date - departure date from search input 
 * @returns {boolean} true -> return the flight departure, arrival, date
 *                    false -> nothing happen
 * 
 */
flightCheck({from, to, date}) {

    // convert input toLowerCase and trim() empty space
    const departureInputSearch = from.trim().toLowerCase();
    const departureAirportData = this.departure_airport.trim().toLowerCase();

    const arrivalInputSearch = to.trim().toLowerCase();
    const arrivalAirportData = this.arrival_airport.trim().toLowerCase();

    const departureDateSearch = date;
    const departureDateData = this.departure_date;


    //filter for matched flight using === 
    const departureFiltered = departureAirportData === departureInputSearch;
    const arrivalFiltered = arrivalAirportData === arrivalInputSearch;
    const dateFiltered = departureDateData === departureDateSearch;
    
    return departureFiltered && arrivalFiltered &&  dateFiltered;
}

































}