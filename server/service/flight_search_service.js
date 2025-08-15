/**
 * flight_search_service.js
 * 
 * filter flights
 */

import { Flight } from "../domain/flight.js";
import { loadFlightData } from "../repo/flight_data_repo.js";


export function filterFlights(searchInput) {

    if (!searchInput) {
        return [];
    }

    const { departure_airport, arrival_airport, departure_date } = searchInput;
    if (!departure_airport || !arrival_airport || !departure_date) return [];

    const flightsData = loadFlightData();

    const flightArray =[];

    for(let i=0; i< flightsData.length; i++) {

        const flightData = flightsData[i];

        const thisFlight = new Flight (
            flightData.flight_id,
            flightData.airline,
            flightData.departure_airport,
            flightData.arrival_airport,
            flightData.departure_date,
            flightData.departure_time,
            flightData.price
        );

        flightArray.push(thisFlight);
    }


    const matchedArray = [];

    const from = String(searchInput.departure_airport || "").trim();
    const to   = String(searchInput.arrival_airport   || "").trim();
    const date = String(searchInput.departure_date    || "").trim();
    const searchInputData = { from, to, date };


    for (let i=0; i < flightArray.length; i++) {


        const currentFlight = flightArray[i];
        
        const matchFound = currentFlight.flightCheck(searchInputData);

        if (matchFound) {
            matchedArray.push(currentFlight);
        }
    }

    return matchedArray;

}

