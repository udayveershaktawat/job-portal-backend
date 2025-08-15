const jwt = require("jsonwebtoken");
require("dotenv").config();



exports.isAuthenticated = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"user not authenticated"
            });
        }
        const decode = await jwt.verify(token,process.env.SECRET_KEY);

        req.id = decode.userId;
        next();

    }
    catch(error){
        console.log(error);

    }
}