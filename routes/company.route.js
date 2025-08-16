





const express = require("express");
const router = express.Router();




// import controller
const {registerCompany , getCompany,getCompanyById,updateCompany} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated")



// routes
router.post("/register",isAuthenticated,registerCompany);
router.get("/get", isAuthenticated,getCompany);
router.get("/get/:id",isAuthenticated,getCompanyById);
router.post("/update/:id", isAuthenticated,updateCompany);


module.exports = router;