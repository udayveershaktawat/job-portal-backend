const express = require("express");
const router = express.Router();









const {registerCompany ,getCompany,getCompanyById,updateCompany} = require("../controllers/company.controller");






// routes
router.post("/register",register);
router.post("/get",login);
router.post("/update/:id",update);
router.get("/get/:id",getCompanyById);