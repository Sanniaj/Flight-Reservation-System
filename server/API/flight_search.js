/**
 * ./API/flight_search.js
 *
 * Flight search API
 *
 * purpose: this program handles flight search requests and returns matching flights
 * 
 * what this do:
 * 1. receive the search input from the front page
 *    - inputs are: departure_airport, arrival_airport, departure_date
 * 3. filter the three input with our flight data from temp memory
 * 4. optional, sort the matching flight by price, low-high
 * 5. send the results back as JSON
 * 
 * 
 * check:
 * 1. if any input is missing, return an error with message.
 * 2. if no match found, display a message "no flights found"
 * 3. if multiple matches found, display a list of flights
 * 4. optional, implement a round-trip search
 */

import express from "express";

import { getFlights } from "../temp_storage/flights_storage.js";

const router = express.Router(); 

// GET /api/flight_search

router.get("/flight_search", (req,res) => {

    // user inputs parameter 
    const {departure_airport, arrival_airport, departure_date} = req.query;

    const flightData = getFlights();   
    const filteredResults = [];

    // loop to compare flight to flight_data
    for(const flight of flightData ){
        if(flight.departure_airport === departure_airport && 
            flight.arrival_airport === arrival_airport && 
            flight.departure_date === departure_date){

            filteredResults.push(flight);
        }
    }

    res.status(200).json({
        success: true,
        message: "connected flight_search router",
        query: {
            departure_airport,
            arrival_airport,
            departure_date
        },
        count: filteredResults.length,
        results: filteredResults
    });
    return;

});

export default router;
