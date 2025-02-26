const User = require('../models/UserModel'); 
const bcrypt = require("bcrypt");

//get all user
exports.getAllUser = async(req,res,next) => {
    try{
        const user = await User.find();

        res.status(200).json(user);

    }catch(error){//try
        res.status(401).json({
            message: "something is wrong",
        });
    }
};

//Update profile

exports.updateUser = async(req,res,next) => {
    const userId = req.params.userId;

    try{
        const user = await User.findById(userId);
        
        if(!user){
            return res.status(400).json({
                message:"Wrong user",
            });
        }

        req.body.password = await bcrypt.hash(req.body.password, 11);

        const updateUser = await User.findByIdAndUpdate(userId,req.body,{new: true,});

        res.status(200).json({
            message:"Profile Updated",
            updateUser,
        });
    }catch(error){
        res.status(401).json({
            message:"You can update only your account",
        });
    }
} ;

//delete user
exports.deleteUser = async(req,res,next) => {
    const userId = req.params.userId;

    try{
        const user = await User.findById(userId);
        
        if(!user){
            return res.status(400).json({
                message:"Wrong user",
            });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        res.status(200).json({
            message: "User deleted successfully",
            deletedUser,
        });
    }catch(error){
        res.status(401).json({
            message:"You can delete only your account",
        });
    }
} ;