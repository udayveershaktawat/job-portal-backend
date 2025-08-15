const express = require("express");
const router = express.Router();




// import controller
const {register , login,logout,updateProfile} = require("../controllers/user.controller");



// routes
router.post("/register",register);
router.post("/login",login);
router.post("/profile/update",updateProfile);
router.get("/logout",logout);


module.exports = router;