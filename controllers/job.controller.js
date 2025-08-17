const Job = require("../models/job.model");

exports.postJob = async(req,res)=>{
    try{
        const {title,description,requirements,salary,location,jobType,experienceLevel,position,companyId} = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position || !companyId ){
            return res.status(400).json({
                message:"all fields are required",
                success:false,
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            companyId:companyId,
            created_by:userId
        })


        return res.status(201).json({
            success:true,
            message:"new job created successfully",
            job,
        })


    }
    catch(error){
        console.log(error)
    }
}