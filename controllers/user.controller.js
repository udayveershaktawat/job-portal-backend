const User = require("../models/user.model");
const bcrypt = require("bcrypt");




exports.register = async(req,res)=>{
    try{
        const {fullname, email,phoneNumber,password,role} = req.body;
        // validation
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"unable to create registration",
            error:error.message
        })

    }

}