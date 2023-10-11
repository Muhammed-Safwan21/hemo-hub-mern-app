// get bllod data

const { default: mongoose } = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

const bloodGroupDetails = async(req,res)=>{
    try {
        const bloodGroups = ['O+' , 'O-' , 'AB+','AB-','A+','A-','B+','B-']
        const bloodGroupData = [];
        const organization = new mongoose.Types.ObjectId( req.body.userId);
        // get single blood group
        await Promise.all(bloodGroups.map(async (bloodGroup) =>{
            // total in
            const totalIn = await inventoryModel.aggregate([
                {
                    $match:{
                    bloodGroup:bloodGroup,
                    inventoryType:'in',
                    organization
                }},
                {
                    $group:{
                        _id:null,total:{$sum: '$quantity'}
                    }
                }
            ])
             // total out
             const totalOut = await inventoryModel.aggregate([
                {
                    $match:{
                    bloodGroup:bloodGroup,
                    inventoryType:'out',
                    organization
                }},
                {
                    $group:{
                        _id:null,total:{$sum: '$quantity'}
                    }
                }
            ])
            // calculate total
            const availableBlood = (totalIn[0]?.total || 0 ) - (totalOut[0]?.total || 0)

            //push data
            bloodGroupData.push({
                bloodGroup,
                totalIn:totalIn[0]?.total || 0 ,
                totalOut:totalOut[0]?.total || 0 ,
                availableBlood
            })
        }))
        return  res.status(200).send({
            success:true,
            message:"bllod group data fetch successfully",
            bloodGroupData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in blood data api",
            error
        })
    }
}

module.exports = {bloodGroupDetails}