const { createPost, updatePost, deletePost, getAllPost, getPost } = require('../controllers/postController');
const { authMiddeleware } = require('../middlewares/auth');

const postRoute = require('express').Router();

postRoute.post("/",authMiddeleware,createPost);
postRoute.put("/:postId",authMiddeleware,updatePost);
postRoute.get("/",getAllPost);
postRoute.get("/:postId", getPost); 
postRoute.delete("/:postId", authMiddeleware, deletePost);

module.exports = postRoute; 