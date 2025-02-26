const {getAllUser, updateUser, deleteUser}=require("../controllers/userController");
const {authMiddeleware}=require("../middlewares/auth");
const userRoute = require('express').Router();

userRoute.get("/",authMiddeleware,getAllUser);
userRoute.put("/:userId",authMiddeleware,updateUser);
userRoute.delete("/:userId",authMiddeleware, deleteUser);

module.exports = userRoute; 