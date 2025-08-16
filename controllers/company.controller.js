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

        return res.status(200).json({
            message:"company fetched successfully",
            success:true
        })

    }
    catch(error){
        console.log(error)
    }
}

// get company by Id 
exports.getCompanyById = async(req,res)=>{
    try{
        const companyId = req.params.id;
        const company = await Company.findById({companyId});
           if(!company){
            return res.status(404).json({
                success:false,
                message:"company not found"
            })
        }

        return res.status(200).json({
            message:"company fetched successfully",
            success:true
        })

    }
    catch(error){
        console.log(error)
    }
}
// update company

exports.updateCompany = async(req,res)=>{
    try{
        const {name,description, website,location } = req.body;
        const file = req.file;

        const updatedata = {name,description, website,location };
        const company = await Company.findByIdAndUpdate(req.params.id,updatedata,{new:true});


        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }

         return res.status(200).json({
            message:"company updated successfully",
            success:true
        })


    }
    catch(error){
        console.log(error)
    }
}