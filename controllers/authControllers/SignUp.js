const User = require("../../models/UserModel");
const bcrypt =require("bcrypt");
const jwt= require("jsonwebtoken");
//signup
exports.signup = async(req,res,next) => {
    
    try{
        req.body.password=await bcrypt.hash(req.body.password,11);
        const {name,username,email,password,profile} = req.body;
        const user =await User.create({
            name,
            username,
            email,
            password,
            profile,
        });

        res.status(201).json({
            message: `Hello ${name}! Your account is created`,
            user,
        });
    }catch(error){
        res.status(401).json({
            message: "something wrong",
        });
    }
};

//login
exports.login= async(req,res,next) => {
    const{username,password}=req.body;
    try{
        const user = await User.findOne({username});

        if(!user){
          return  res.status(401).json({
                message: "username not found",
            });
        }

        const validated = await bcrypt.compare(password,user.password);
        if(!validated){
            return  res.status(400).json({
                message: "password doesn't match",
            });
        }
        const token  = await jwt.sign({username, _id:user._di}, process.env.PRIVATE_KEY,{expiresIn:"2h"});

        res.status(401).json({
            message: "Login Succesfully",
            token,
        });
    }catch(error){
        res.status(404).json({
            message: "not found",
        });
    }
};

