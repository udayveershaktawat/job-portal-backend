const express = require("express");
const router = express.Router();



const isAuthenticated = require("../middlewares/isAuthenticated");
// import controller
const {register,login,logout,updateProfile} = require("../controllers/user.controller");




// routes
router.post("/register",register);
router.post("/login",login);
router.put("/profile/update",isAuthenticated,updateProfile);
router.get("/logout",logout);


module.exports = router;