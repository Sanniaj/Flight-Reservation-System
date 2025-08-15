/**
 * flight_data_repo.js
 * 
 * purpose: read/edit the server/data/flight_data.json
 *       
 * 
 * 
 * Function: 
 *      - loadFlightData() -> read flight_data.json then return an array of flights
 * 
 * 
 * ###important:
 *      - flight.flight_id
 *      - flight.departure_airport
 *      - flight.arrival_airport
 *      - flight.departure_date
 *      -flight.price
 * 
 * note: 
 *      -flight_data.json location: ../data/flight_data.json
 *      - used in flight_search.js 
 * 
 * 
 */


import fs from "fs";
import path from "path";

const projectRoot = process.cwd(); // get project root like  C:\Users\thinh\Documents\GitHub\likeag6
const flightDataFilePath = path.join(projectRoot, "data", "flight_data.json");

export function loadFlightData() {
    const rawFlightData = fs.readFileSync(flightDataFilePath, "utf8");

    if(!rawFlightData.trim()) { // if no flight data, return an empty array []
        return [];
    }

    try { 
        const flightData = JSON.parse(rawFlightData) // convert rawFlightData into JSON - flightData
        return flightData;

    } catch (err) {
        console.error("[flight_data_repo] flight_data.json is broken. sending an empty list: ",err) // if parse error, return empty [];
        return [];
    }

}