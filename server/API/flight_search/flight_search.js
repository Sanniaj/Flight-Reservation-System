/**
 * flight_search.js
 * 
 * Purose: filter a list of flights using departure_airport + arrival_airport + departure_date;
 * 
 * Parameter: 
 * @param {Array} flights - full flight list (from flight_data_repo.js)
 * @param {Object} searchInput
 *      @param {string} searchInput.departure_airport - departure airport input from frontend
 *      @param {string} searchInput.arrival_airport - arrival airport input from frontend
 *      @param {string} searchInput.departure_date - departure date from frontend. should be {YYYy-MM-DD}
 * 
 * Return: matchingFlight
 *  - an array of flights that match our fields (departure, arrival, date)
 * 
 * ### important object:
 * -> flight.departure_airport
 * -> flight.arrival_airport
 * -> flight.departure_date
 * 
 * Flow: repo.loadFlightData() -> filterFlights() -> results
 * 
 * 
 * 
 */


export function filterFlights(flights, searchInput) {
    const departure_airport = searchInput.departure_airport;
    const arrival_airport = searchInput.arrival_airport;
    const departure_date = searchInput.departure_date;

    const matchingFlights = [];
    
    //loop start
    // loop through every stored flight from data.json
    for (let i = 0; i < flights.length; i++){
        const storedFlight = flights[i];

        // check if storedFlight match with the user input (departure_airport, arrival_airport, departure_date)
        if (
            storedFlight.departure_airport === departure_airport &&
            storedFlight.arrival_airport === arrival_airport &&
            storedFlight.departure_date === departure_date
        ) {
            matchingFlights.push(storedFlight);
        }
    }

    return matchingFlights;
}

