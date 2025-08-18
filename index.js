const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectWithDb = require("./config/database");
const userRoute = require("./routes/user.route");
const companyRoute =require("./routes/company.route");
const jobRoute = require("./routes/job.route")

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http//localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

connectWithDb();

// api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute)

app.listen(process.env.PORT,()=>{
    console.log(`server started at port number ${PORT}`)
})
