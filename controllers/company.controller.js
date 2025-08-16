const Company = require("../models/company.model");


exports.registerCompany = async(req,res)=>{
    try{
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"company name is require",
                success:false
            })
        }

        let comapny = await Company.findOne({name:companyName})

        if(company){
            return res.status(400).json({
                message:"you can't register same company name",
                success:false,
            })
        }

        company = await Company.create({
            name:companyName,
            userId:req.id
        })

        return res.status(201).json({
            success:true,
            message:"company register successfully"
        })

    }
    catch(error){
        console.log(error)
    }
}

// get Company
exports.getCompany = async(req,res)=>{
    try{
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                success:false,
                message:"company not found"
            })
        }

    }
    catch(error){
        console.log(error)
    }
}