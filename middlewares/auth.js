const User = require ("../models/UserModel");
const jwt = require ('jsonwebtoken');

exports.authMiddeleware = async (req,res,next) =>{
    
   try{
       const token = req.headers.authorization;

       if (!token){
        return res.status(401).json({
            message: "Access not allowed",
        });
       }
       const sToken = token.split(" ") [1];
       const decode = jwt.verify(sToken,process.env.PRIVATE_KEY);
       const id = decode.id;
       const user = await User.findById(id);
       req.user = user;

       next();

    }catch(error){
        res.status(401).json({
            message: "Authentication failed",
        });
    }
};