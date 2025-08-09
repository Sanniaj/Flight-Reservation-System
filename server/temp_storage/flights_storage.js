
// server/temp_storage/flights_storage.js

/**
 * flights_storage.js
 * ------------------
 * Purpose:
 * - Hold the flights array in memory — temporary storage — while the server is running.
 *
 * How it works:
 * 1. When the server starts, we load the flights data from flight_data.json into this array.
 * 2. All parts of the server can access and modify this array as needed,
 *    so it serves as a central repository for flight data during runtime.
 *
 * note to self:
 * - This is only temporary memory. When the server stops, the array will be cleared.
 */


//temporary in-memory storage for flight data
let flights = [];

//function to let other files read the flights array
export function getFlights() {
    return flights;
}

/** 
 * let the other files replace the array.
 * 
 * 
 */
export function setFlights(arr) {
    flights = Array.isArray(arr) ? arr : [];
    return flights;
}
