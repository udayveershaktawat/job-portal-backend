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