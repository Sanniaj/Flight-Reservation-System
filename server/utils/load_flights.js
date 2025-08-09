/**
 * load_flights.js
 * ----------------
 * Purpose:
 * - read the flights data (server/data/flight_data.json) from disk and load its contents
 *   into the flights array (temp_storage/flights_storage.js)'
 *
 *  i made this to make sure the server always starts with
 *  a valid flights array in temporary storage and prevent crashing from missing or invalid data.
 *
 *
 * How it works:
 * 1. find the flight_data.json file.
 * 2. if the file is missing or empty, create it with an empty array
 * 3. if the file has data, store it in memory.
 * 4. if the file is invalid (e.g., corrupted JSON) replace the file with a new empty array[].
 * 
 *
 * Note:
 * - This module is responsible for initializing the flight data.
 */

// call file system module to read and write files
// call path module to define a path to the flight_data.json file
// call url module to convert __filename to a file path
// call our temporary storage to update the flight lists
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { setFlights } from "../temp_storage/flights_storage.js";

export function loadFlights() {
    // find the full path to the flight_data.json file
    const __filename = fileURLToPath(import.meta.url);

    // find the directory name, or folder of where this file is
    const __dirname = path.dirname(__filename);

    //build the full path to server/data/flight_data.json
    //path.join() make this dataPath works on all operating systems
    const dataPath = path.join(__dirname, "../data/flight_data.json");

    /**
     * case A: for when the file does not exist or error. 
     * if the file we get from dataPath does not exist
     * we create a new file with an empty array to make sure the server start with something
     * we set the Flights array to be an empty array
     * 
     * fs.writeFileSync(path, data, encoding)
     * @param {string} path - full path where the file will be created
     * @param {string} data - a string content to write to the file. we have "[]" an empty array for this case.
     * @param {string} encoding - set to utf-8 to write as plain text.
     *
     * setFlights([]);
     * @param {Array} arr - the flights array to store in temporary mem,
     * for this case, we use an empty array [] to initialize the flights data.
     * 
     * console.warn: log to the console to let us know that the file was missing -> created an empty file instead.
     */
    if(!fs.existsSync(dataPath)){ 

        fs.writeFileSync(dataPath, "[]", "utf-8");
        setFlights([]);
        console.warn(`Flight data file does not exist, creating an empty array at ${dataPath}.`);
        return [];
    }

    const raw = fs.readFileSync(dataPath, "utf-8");

    /**
     * case B: file exists, we try to read the file and parse it as JSON.
     * 
     * JSON.parse(text)
     * @param {string} text - the JSON string to parse
     * @throw {Error} - if the JSON is invalid, it will throw an error
     * 
     * Array.isArray(value)
     * @param {any} value - the value to check
     * @return {boolean} - true if the value is an array, false otherwise
     * 
     * purpose: 
     * we need to make sure that the file have a valid JSON format and
     *  it is an array similar to our flights data,
     * if the file is correct, we parse the data and fill the temporary storage with our flight_data
     *
     * catch, display an error message to the console
     */
    try{
        const parsed = JSON.parse(raw);
        if(!Array.isArray(parsed)){
            throw new Error("incorrect file format. must be an array.");
        }

    //store in memory
    setFlights(parsed);
    console.log(`loaded ${parsed.length} flights into memory from ${dataPath}`);
    return parsed;

    // catch, display an error message to the console
    } catch(err){
        console.error("incorrect JSON format, creating an empty file.");
        fs.writeFileSync(dataPath, "[]", "utf-8");
        setFlights([]);
        return [];
    }

}