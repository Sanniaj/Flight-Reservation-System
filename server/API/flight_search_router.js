/**
 * flight_search_router
 * 
 * purpose:
 *  
 *   - get input from frontend  
 *   - validate input (departure_airport, arrival_airport, departure_date)
 *   - call service to search flight
 *   = push results to checkout page
 *
 * 
 * parameter:
 *  @param {string} from -departure airport input from frontend 
 * @param {string} to - arrival airport from frontend
 * @param {string} date - departure date from frontend 
 * 
 * return: 
 *  
 * 
 * important object:
 *  - flight.departure_airport
 *  - flight.arrival_airport
 *  - flight.departure_date
 * 
 * 
 * flow:
 *  router -> service.searchFlights() -> repo.loadFlightData -> domain.flightCheck() -> frontend (send back results)
 * 
 */



import express from "express";
import { filterFlights } from "../service/flight_search_service.js";

const flight_search_router = express.Router(); 

// get results from search page
flight_search_router.get ("/flight_search", function (req, res) {


    const searchInput = {};

    //declare object for the search Input
    searchInput.departure_airport = req.query.departure_airport;
    searchInput.arrival_airport = req.query.arrival_airport;
    searchInput.departure_date = req.query.departure_date;

    // if any of the object from search input is empty, return an empty array
    if (!searchInput.departure_airport ||
        !searchInput.arrival_airport ||
        !searchInput.departure_date
    ) {
        const emptyArray = [];

        res.json(emptyArray);
        return;
    }

    // get results from filterFlights() from service/flight_search_service.js
    const results = filterFlights(searchInput);

    res.json(results);
});











export default flight_search_router;


