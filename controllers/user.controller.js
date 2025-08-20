const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fileDataUri = require("../utils/datauri");
const cloudinary = require("cloudinary");




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
        });
        return res.status(200).json({
            success:true,
            message:"account created successfully"
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

// login

exports.login = async(req,res)=>{
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"please enter all the details"
            })
        }

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"incorrect email or password"
            })
        }
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(400).json({
                success:false,
                message:"incorrect email or password"
            })
        }
        // check role
        if(role !== user.role){
            return res.status({
                success:false,
                message:"account does not exist with current role"
            })
        }

        const tokenDate = {
            userId:user._id
        }

        const token = await jwt.sign(tokenDate,process.env.SECRET_KEY,{expiresIn:"24h "});

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }


        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true,sameSite:"strict"}).json({
            success:true,
            message:`login successfully ${user.fullname}`,
            user
        })




    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error while login",
            error:error.message
        })

    }
}
// logout
 exports.logout = async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"logged out successfully"
        })

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error while logout",
            error:error.message
        })
        
    }
 }

//  update profile
exports.updateProfile = async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}= req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        if(!fullname || !email || !phoneNumber || !bio || skills){
            return res.status(400).json({
                message:"all fields are required",
                success:false
            })
        }

        const skillsArray = skills.split(",");
        const userId = req.id;
        let user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }


        // updating data
        user.fullname = fullname,
        user.email=email,
        user.phoneNumber=phoneNumber,
        user.profile.bio=bio,
        user.profile.skillsArray = skillsArray




        if(cloudResponse){
            user.profile.resume = cloudResponse.secure.url,
            user.profile.resumeOriginalName = file.originalname
        }



        await user.save();


        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }


        return res.status(200).json({
            success:true,
            message:"profile updated successfully",
            user,
        })

         
    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error while logout",
            error:error.message  
        })

    }
}