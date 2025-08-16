const express = require("express");
const router = express.Router();




// import controller
const {register , login,logout,updateProfile} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated")



// routes
router.post("/register",register);
router.post("/login",login);
router.post("/profile/update",isAuthenticated,updateProfile);
router.get("/logout",logout);


module.exports = router;