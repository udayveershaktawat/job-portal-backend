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

// get alll job
exports.getAllJobs = async(req,res)=>{
    try{
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }

        const jobs = await Job.find(query);
        if(!jobs){
            return res.status(404).json({
                success:false,
                message:"jobs not found"
            })
        }

        return res.status(200).json({
            success:true,
            jobs,
            message:"jobs fetched successfully"
        })


    }
    catch(error){
        console.log(error)
    }
}


// get jobi by id
exports.getJobById = async(req,res)=>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                success:false,
                message:"jobs not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"job fetched successfully through Id",
            job
        })

    }
    catch(error){
        console.log(error)

    }
}

// get admin jobs
exports.getAdminJobs = async(req,res)=>{
    try{
        const adminId = req.body;
        const jobs = await Job.find({created_by:adminId});
           if(!jobs){
            return res.status(404).json({
                success:false,
                message:"jobs not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"successfully fetched",
            jobs,
    
        })
     }
    catch(error){
        console.log(error)
    }
}