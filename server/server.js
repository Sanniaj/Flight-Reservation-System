
/** import the express framework and node's path
 * 
 * express: let us create a webserver and define API routes
 * path: help us work with file and folder path
 * fileURLToPath: convert the URL of this file (import.meta.url) into a file system path
 * 
 * for future references:
 *  - https://expressjs.com/en/api.html
 */
import path from "path";
import { fileURLToPath } from "url";

// modules
import morgan from "morgan";
import express from "express";

//local project files
import flightSearchRouter from "./api/flight_search/flight_search_router.js";
import seatRouter from "./api/seat_router.js";
import bookingRouter from "./api/booking_router.js";


/** create express application (new webserver) 
 * and choose a port number to listen on for incoming requests
*/
const app = express();
const PORT = 3000;


/**get the absolute path to this file (__filename) and the folder it's in (__dirname)*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



/** middleware - extra things
 * show each GET/POST request in the console
 * log status/time/size
 */
app.use(morgan("dev"));

//middleware to parse JSON
// this is for checkout inputs. -> get user info (string) and parse it to an object  "name":timmy -> name: "timmy"
app.use(express.json());









// serve static files from the search-page, result-page, confirmation-page, and checkout-page directories
/** Make only the frontend folders accessible publicly
 * keep everything under /static to separete from /api
 * to not expose the backend implementation details
 */
app.use("/static", express.static(path.join(__dirname, "../flight-booking-system")));



/*===============================
        API routes 
=================================*/

// call flightSearchRouter
app.use("/api", flightSearchRouter);

// call seat_router.js
app.use("/api", seatRouter);

// call booking)router.js
app.use("/api", bookingRouter);







// check server is working
app.get("/api/health", (req, res) => res.status(200).json({ ok: true }));


 


// our default route when running the server
// basically front page when pasted url: localhost:3000
// 
// starting the server steps:
// need to be in server folder, ex: \GitHub\likeag6\server> 
// input 'npm start' -> enter 
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../flight-booking-system/search-page/frontend-search-location.html")
    );
});














//Start the server and listen on port (3000)
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

