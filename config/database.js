const mongoose = require("mongoose");
require("dotenv").config();


const connectWithDb = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("db connect successfully")})
    .catch((error)=>{console.log("error while db connect");
                    console.error(error);
                    process.exit(1)})
}

module.exports = connectWithDb