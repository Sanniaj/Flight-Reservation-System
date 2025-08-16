/**
 * manager_router.js
 * 
 * purpose: router to get and push data from manager page
 * 
 */


import express from "express";
import { getReport } from "../service/manager_service.js";

const managerRouter = express.Router();

managerRouter.get("/manager/reports", (req,res) => {

    const report = getReport();
    res.json(report);
});

export default managerRouter;

