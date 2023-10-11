const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

// create inventory
const createInventory = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // if (inventoryType === "in" && user.role !== "donar") {
    //   throw new Error("Not a donar account");
    // }
    // if (inventoryType === "out" && user.role !== "hospital") {
    //   throw new Error("Not a hospital");
    // }

    if (req.body.inventoryType == "out") {
      const requestedBloodGroup = req.body.bloodGroup;
      const requestedQuantityOfBlood = req.body.quantity;

      const organization = new mongoose.Types.ObjectId(req.body.userId);

      //calculate blood quantity
      const totalInOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "in",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",   // check this line
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("total in :", totalInOfRequestedBlood);

      const totalIn = totalInOfRequestedBlood[0]?.total || 0;

      //calculate Out blood quantity
      const totalOutOfRequestedBlood = await inventoryModel.aggregate([
        {
          $match: {
            organization,
            inventoryType: "out",
            bloodGroup: requestedBloodGroup,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      // console.log("total out:", totalOutOfRequestedBlood);
      const totalOut = totalOutOfRequestedBlood[0]?.total || 0;
      // in & out calc
      const availableQuantityOfBloodGroup = totalIn - totalOut;
      if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
        return res.status(500).send({
          success: false,
          message: `only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user?._id;
    }else{
      req.body.donor = user?.id;
    }

    //save record
    const inventory = new inventoryModel(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New blood record saved",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in create inventory API",
      error,
    });
  }
};

// get all blood records
const getInventory = async (req, res) => {
  try {
    console.log(req.body)
    const inventory = await inventoryModel
      // .find({ })
      .find({ organization: req.body.userId })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "get all records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get all inventories",
      error,
    });
  }
};

// get hospital blood records
const getInventoryHospital = async (req, res) => {
  try {
    console.log(req.body)
    const inventory = await inventoryModel
      // .find({ })
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organization")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "get hospital consumer records successfully",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in  hospital consumer  inventories",
      error,
    });
  }
};

//get blood record of 3

const getRecentInventories = async(req,res)=>{
  try {
    const inventory = await inventoryModel.find({
      organization:req.body.userId
    }).limit(3).sort({createdAt:-1})
    return res.status(200).send({
      success: true,
      message: "recent inventories data",
      inventory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in get recent inventories",
      error,
    });
  }
}

// get donor record
const getDonors = async(req,res) =>{
  try {
    const organization = req.body.userId;
    // find donor
    const donorId = await inventoryModel.distinct("donor",{organization})
    // console.log(donorId)
    const donors = await userModel.find({_id:{$in:donorId}});
    return res.status(200).send({
      success:true,
      message:'Donor records fetched successfully',
      donors
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"Error in get donors records",
      error
    })
    
  }
}

//get hospital record

const getHospital = async(req,res) =>{
  try {
    const organization = req.body.userId;
    // find hospital
    const hospitalId = await inventoryModel.distinct("hospital",{organization})
    const hospitals = await userModel.find({_id:{$in:hospitalId}});
    // console.log(hospitals)
    return res.status(200).send({
      success:true,
      message:'Hospital records fetched successfully',
      hospitals
    })

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      success:false,
      message:"Error in get hospital records",
      error
    })
  }
}

  //get organization record

  const getOrganization = async(req,res) =>{
    try {
      const donor = req.body.userId;
      const organizationId = await inventoryModel.distinct("organization",{donor}) //search
      // find organization
      const organizations = await userModel.find({_id:{$in:organizationId}});
      return res.status(200).send({
        success:true,
        message:'organization records fetched successfully',
        organizations
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success:false,
        message:"Error in get organization records",
        error
      })
    }

  }

   //get organization record for hostital

   const getOrganizationForHospital = async(req,res) =>{
    try {
      const hospital = req.body.userId;
      const organizationId = await inventoryModel.distinct("organization",{hospital}) //search
      // find organization
      const organizations = await userModel.find({_id:{$in:organizationId}});
      return res.status(200).send({
        success:true,
        message:'hospital organization records fetched successfully',
        organizations
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        success:false,
        message:"Error in get organization records",
        error
      })
    }

  }

module.exports = { createInventory, getInventory, getDonors, getHospital, getOrganization ,getOrganizationForHospital
,getInventoryHospital,getRecentInventories};
