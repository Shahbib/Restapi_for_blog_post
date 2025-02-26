const Post = require('../models/postModel');

//create post
exports.createPost= async(req,res,next)=>{
    const {title,body,username,category,photo} = req.body;
    
    try{
        const post = await Post.create({
            title,
            body,
            username,
            category,
            photo,
        });

        res.status(201).json(post);
    }catch(error){
        res.status(401).json({
            message: "Something wrong",
        });
    }

};

//get all post
exports.getAllPost= async(req,res,next)=>{
    const {username, category} = req.query;    
    try {
        let posts;

        if(username){
            posts = await Post.find({username});
        }
        else if(category) {
            posts = await Post.find({
                category:{
                $in: [category],
            },
        });
        }
        else{
            posts=await Post.find();
        }
        
        res.status(200).json(posts);        
    } catch (error) {
        res.status(401).json({
            message: "Something wrong",
            error,
        });
    }
};

//update
exports.updatePost= async(req,res,next)=>{
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);

        if(!post){
            return res.status(401).json({
                message:"post not found",
                
            });
        }

        const updatePost = await Post.findByIdAndUpdate(postId,req.body,{
            new: true,
        });

        res.status(200).json({
            message:"Post update succesfully",
            updatePost,
        });
    } catch (error) {
        res.status(401).json({
            message:"You can update only your post",
            error,
        });
    }

};

//delete post

exports.deletePost= async(req,res,next)=>{
    const postId = req.params.postId;

    try {
        const post = await Post.findById(postId);

        if(!post){
            return res.status(401).json({
                message:"post not found",
                
            });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            message:"Post deleted succesfully",
            
        });
    } catch (error) {
        res.status(401).json({
            message:"You can deleted only your post",
            error,
        });
    }

};

exports.getPost= async(req,res,next)=>{
    const postId = req.params.postId;
    try {
        const post = await Post.findById(postId);
        res.status(200).json(post);

    } catch (error) {
        res.status(400).json({
            message:"Something wrong",
            
        });
    } 
};