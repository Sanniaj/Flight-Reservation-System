
/** import the express framework and node's path
 * 
 * express: let us create a webserver and define API routes
 * path: help us work with file and folder path
 * fileURLToPath: convert the URL of this file (import.meta.url) into a file system path
 */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { loadFlights } from "./utils/load_flights.js";

/** create express application (new webserver) 
 * and choose a port number to listen on for incoming requests
*/
const app = express();
const PORT = 3000;

/** request logging
 * show each GET/POST request in the console
 * log status/time/size
 */
import morgan from "morgan";
app.use(morgan("dev"));

//call load_flights
loadFlights();

/**get the absolute path to this file (__filename) and the folder it's in (__dirname)*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve static files from the search-page, result-page, confirmation-page, and checkout-page directories
/** Make only the frontend folders accessible publicly
 * keep everything under /static to separete from /api
 * to not expose the backend implementation details
 */
app.use("/static", express.static(path.join(__dirname, "../flight-booking-system")));

//set default route to main page (frontend-search-location.html)
// serve the main search page

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../flight-booking-system/search-page/frontend-search-location.html")
    );
});

// check server is listening
app.get("/api/health", (req, res) => {
    res.status(200).json({ ok: true });
});

//Start the server and listen on port (3000)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});