const express = require("express");
const router = express.Router();

const isAuthentication = require("../middlewares/isAuthenticated");


// import controller

const {}










router.post("/post",isAuthentication,postJob);
router.get("/get",isAuthentication,getAlljobs);
router.get("/getadminjobs",isAuthentication,getAdminJobs);
router.get("/get/:id",isAuthentication,getJobsId)