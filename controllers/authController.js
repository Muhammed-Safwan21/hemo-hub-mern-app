const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userRegister = async (req,res) => {
    try {
        const existingUser = await userModel.findOne({email:req.body.email})
        //validation
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'User already exists'
            })
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPassword ;
        
        const user = new userModel(req.body);
        await user.save()
        return res.status(201).send({
            success:true,
            message:'User registered successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message:'Error in Register API',
            error
        })
        
    }
};

const userLogin = async (req,res) =>{
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        // compare password

        const comparePassword = await bcrypt.compare(req.body.password,user.password)
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:"inavlid credentials "
            })

        }
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
        return res.status(200).send({
            success:true, 
            message:"Logged in successfully",
            token,
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message:'Error in Login API',
            error
        })
    }

}

//current user
const currentUser = async(req,res) =>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        // console.log("user",user)
        return res.status(200).send({
            success:true,
            message:"User fetched successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"unable to get current user",
            error
        })
        
    }
}


module.exports = {
  userRegister,userLogin,currentUser
};
