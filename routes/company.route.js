





const express = require("express");
const router = express.Router();



const isAuthenticated = require("../middlewares/isAuthenticated")
// import controller
const {registerCompany,getCompany,getCompanyById,updateCompany} = require("../controllers/company.controller");




// routes
router.post("/registercompany",isAuthenticated,registerCompany);
router.get("/getcompany",isAuthenticated,getCompany);
router.get("/getcompany/:id",isAuthenticated,getCompanyById);
router.put("/updatecompany/:id", isAuthenticated,updateCompany);


module.exports = router;