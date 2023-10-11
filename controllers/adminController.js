const userModel = require("../models/userModel")

// get Donor List
const getDonorList = async(req,res)=>{
    try {
        const donorData =await userModel.find({role:'donor'}).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"Donor list fetched successfully",
            totalCount:donorData.length,
            donorData
        }) 
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Donor list api",
            error
        })
    }
}

// get hospital List
const getHospitalList = async(req,res)=>{
    try {
        const hospitalData =await userModel.find({role:'hospital'}).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"Hospital list fetched successfully",
            totalCount:hospitalData.length,
            hospitalData
        }) 
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Donor list api",
            error
        })
    }
}

// get org List
const getOrgList = async(req,res)=>{
    try {
        const orgData =await userModel.find({role:'organization'}).sort({createdAt:-1})
        return res.status(200).send({
            success:true,
            message:"organization list fetched successfully",
            totalCount:orgData.length,
            orgData
        }) 
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Donor list api",
            error
        })
    }
}

// delete donor

const deleteDonor = async(req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"Donor record deleted successfully",
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in delete donor",
            error
        })
    }
}


// delete hospital

const deleteHospital = async(req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"hospital record deleted successfully",
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in delete hospital",
            error
        })
    }
}


// delete org

const deleteOrg = async(req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"org record deleted successfully",
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"error in delete org",
            error
        })
    }
}

module.exports = {getDonorList, getHospitalList, getOrgList, deleteDonor, deleteHospital, deleteOrg}