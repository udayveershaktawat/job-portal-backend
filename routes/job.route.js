const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");


// import controller

const {postJob,getAlljobs,getAdminJobs,getJobsId} = require("../controllers/job.controller")










router.post("/post",isAuthenticated,postJob);
router.get("/get",isAuthenticated,getAlljobs);
router.get("/getadminjobs",isAuthenticated,getAdminJobs);
router.get("/get/:id",isAuthenticated,getJobsId)



module.exports  = router;