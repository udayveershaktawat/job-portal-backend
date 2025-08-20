const express =require("express");
const router = express.Router();


// import 
const isAuthenticated = require("../middlewares/isAuthenticated")
const {applyJob, getAppliedJobs, getApplicant,updateStatus} = require("../controllers/application.controller");

// create routes
router.get("apply/:id",isAuthenticated,applyJob);
router.get("get",isAuthenticated,getAppliedJobs);
router.get("/:id/applicants",isAuthenticated,getApplicant);
router.post("/status/:id/update",isAuthenticated,updateStatus);





module.exports = router
