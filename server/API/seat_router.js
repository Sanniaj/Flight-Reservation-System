/**
 * create router path for SeatGen.js
 * 
 * 
 * 
 */

import express from "express";
import {generateSeats} from "./SeatGen.js";

//create new express router -> 'seatRouter'
const seatRouter = express.Router();


seatRouter.get("/seatgen", (req,res) =>{
    
    // generate 10 row + 6 seat per row for seat-selection.js
    const SeatMap = generateSeats(10,6);
    res.json({SeatMap});
});

export default seatRouter;


