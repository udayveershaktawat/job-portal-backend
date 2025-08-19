const Application = require("../models/application.model");
const Job = require("../models/job.model");
exports.applyJob = async(req,res)=>{
    try{
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId){
            return res.status(400).json({
                message:"job id is not found",
                success:false,
            })
        }
        // check applicant  already exists
        const existingApplication = await Application.findOne({job:jobId,applicant:userId});
        if(existingApplication){
            return res.status(400).json({
                message:"you have already aplied for this job",
                success:false
            })
        }

        // check if job exist
        const job = await Job.findById(jobId)
        if(!job){
            return res.status(400).json({
                success:false,
                message:"message not found"
            })
        }

        // create new applicant
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });


        job.applications.push(newApplication._id);
        await job.save()

        return res.status(201).json({
            message:"job applied successfully",
            success:false,

        })



    }
    catch(error){
        console.log(error)

    }
}

// get applied job
exports.getAppliedJobs = async(req,res)=>{
    try{
        const userId = req.id;
        const application = await Application.findOne({
            applicant:userId
        }).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"no application",
                success:false
            })
        };

        return res.status(200).json({
            success:true,
            message:"successfully fetched",
            application
        })

    }
    catch(error){
        console.log(error)
    }
}

// get applicant
exports.getApplicant = async(req,res)=>{
    try{
        const jobId = req.params.id

        const job = await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            path:"applicant",
            
        })

        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false,
            })
        }

        return res.status(200).json({
            job,
            success:true,
        })

    }
    catch(error){
        console.log(error)
    }
}

// update status
exports.updateStatus = async(req,res)=>{
    try{
        const status = req.body;
        const applicationId = req.params.id;

        if(!status){
             return res.status(404).json({
                message:"status is required",
                success:false,
            })
        };

        // find the application by applicant id

        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json({
                message:"application not found",
                success:false,
            })
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();


        return res.status(200).json({
            message:"status updated successfully",
            success:true
        })

        

    }
    catch(error){
        console.log(error)
    }
}