/** 
 * booking_router.js
 * 
 * what this do:
 * 
 * booking router will get data from checkout page. parse it to a JSON  
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * for future self incase u forgot 
 *  - https://expressjs.com/en/guide/routing.html
 *  for troubleshooting:
 *  - https://stackoverflow.com/questions/75004188/what-does-fileurltopathimport-meta-url-do
 *  
 * import express to create router
 * import fs to read/write files --- booking.json
 * path: handle file path ex: c:user\GitHub\likeag6\server\api> 
 * fileURLToPath: like the name said. convert file url to file system path 
 */
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url"; 
import Booking from "./booking.js";

const bookingRouter = express.Router();

/* path to booking.json
 convert url to file system path C:server/api/router.js
 __dirname to go to parent folder of current file. C:server/api
 go up one more folder using __dirname -> C:server/ then join ../data/booking.json
 RESULT: we got C:/server/data/booking.json 
 */
const __filename = fileURLToPath(import.meta.url);                    
const __dirname = path.dirname(__filename);                            
const bookingFilePath = path.join(__dirname, "../data/booking.json"); 
                                                                      

bookingRouter.get("/bookings", (req, res) => {
  if (!fs.existsSync(bookingFilePath)) {
    return res.status(200).json([]);
  }

  const fileData = fs.readFileSync(bookingFilePath, "utf-8").trim();
  if(fileData === "") {
    return res.status(200).json([]);
  }

  try{
    const bookings = JSON.parse(fileData);
    if (Array.isArray(bookings)) {
      return res.status(200).json(bookings);

    } else {
        console.error("Invalid format in booking.json");
        return res.status(200).json([]);
    }
  } catch (err) {
      console.error("Parse error in booking.json:", err);
      return res.status(200).json([]);
  }
});











/*
    set up api endpoint
*/
bookingRouter.post("/bookings", (req, res) => {
    console.log("boking request: ", req.body);

    const { flight, selectedSeat, customer } = req.body || {};
    console.log("[/api/bookings] body:", { flight, selectedSeat, customer });

    //testing
    /*
    if(!selectedSeat) return res.status(400).json({error:"missing selectedSeat"});
    if(!flight) return res.status(400).json({error:"missing flight"});
    if(!customer) return res.status(400).json({error:"missing customer"});
    if(!customer.email) return res.status(400).json({error:"missing email"});
    */  
    /* return res.status(200).json({ received: true });
        
         testing data for postman > body
        {
        "flight": { "flight_id": "F001" },
        "selectedSeat": "6A",
        "customer": { "first_name": "Timmy" },
        "customer": { "email": "timmy@gmail.com" }
        }
    */

    if (flight && flight.price) {
        flight.price = Number(flight.price);
    }
    
    const newBooking = new Booking({ flight, selectedSeat, customer});
    console.log("from [../api/booking.js] new boking created: ", newBooking);

    console.log("[/api/bookings] save path:", bookingFilePath); //[/api/bookings] save path: C:\Users\thinh\Documents\GitHub\likeag6\server\data\booking.json
    // return res.status(201).json(newBooking); //{"flightId":"F001","selectedSeat":"6A","customer":{"email":"timmy@gmail.com"},"confirmation":"F001---"}

    let bookings = [];

    //check point
    if (fs.existsSync(bookingFilePath)) {
        const fileData = fs.readFileSync(bookingFilePath , "utf-8");

        if (fileData.trim() !== "") {
            try{
                bookings = JSON.parse(fileData);
            } catch(err) {
                console.error(" uh oh [/api/bookings] we got parse error for booking.json", err);
                bookings = [];
            }            
        }
    }

    // console.log("[/api/bookings] current bookings:", bookings); // current booking []

    bookings.push(newBooking); 

    // console.log("from: api/bookings: booking count: ", bookings.length); // booking count: 1

    let jsonText = JSON.stringify(bookings, null, 2);

     // write to booking.json
    try {
        fs.writeFileSync(bookingFilePath, jsonText, "utf8");
        console.log("[/api/bookings] write check:", bookingFilePath);
    } catch (err) {
        console.error("[api/bookings] : failed to write.....", err);
        return res.status(500).json({error: "failed to save to booking.json"});
    }

    return res.status(200).json(newBooking);
});


















export default bookingRouter;















/*
===================== test data ===============================
{
  "flight": {
    "flight_id": "F20008",
    "departure_airport": "LAX",
    "arrival_airport": "JFK",
    "departure_date": "2025-08-17",
    "departure_time": "13:20:03",
    "price": "350"
  },
  "selectedSeat": "6A",
  "customer": {
    "first_name": "timmy",
    "last_name": "Do",
    "email": "timmy@yahoo.com",
    "address": "19724",
    "city": "Los Angeles",
    "state": "CA",
    "zip": "92523",
    "country": "United States",
    "phone": "1-239 789 2839"
  }
}
===============================================================


==================== array output: ==============================
Date: 20250817
Airport : LAX
FlightID: F20008
Time : 132003
Confirmation number: F20008-LAX-20250817-132003
from [../api/booking.js] new boking created:  Booking {
  flightId: 'F20008',
  departure_airport: 'LAX',
  arrival_airport: 'JFK',
  departure_date: '2025-08-17',
  departure_time: '13:20:03',
  price: 350
  selectedSeat: '6A',
  customer: {
    first_name: 'timmy',
    last_name: 'Do',
    email: 'timmy@yahoo.com',
    address: '19724',
    city: 'Los Angeles',
    state: 'CA',
    zipcode: '92523',
    country: 'United States',
    phone: '1-239 789 2839'
  },
  confirmation: 'F20008-LAX-20250817-132003'
==============================================================
*/


























// // testing
// const testFlight = {
//     flight_id: 'F20008',
//     departure_airport: 'LAX',
//     arrival_airport: 'JFK',
//     departure_date: '2025-08-17',
//     departure_time: '13:20',
//     price: 350
// };

// const testCustomerInfo = {
//     first_name: 'timmy',
//     last_name: 'Do',
//     email: 'timmy_testing@yahoo.com',
//     address: '19724',
//     city: 'Los Angeles',
//     state: 'CA',
//     zip: '92523',
//     country: 'United States',
//     phone: '1-239 789 2839'
// };

// const testselectedSeat = '6A';

// const booking = new Booking({
//     flight: testFlight,
//     selectedSeat: testselectedSeat,
//     customer: testCustomerInfo
// });

// console.log("test booking:", booking);



