import { Request, Response } from "express";
import Post from "../models/postModel";
import User from "../models/userModel";
import { StatusCodes } from "http-status-codes";


export const createPost = async (req: Request, res: Response) => {
    try {
        const {userId, content, category, tags} = req.body;

        // Split the tags string into an array of tags
        const tagsArray = tags.split(',').map((tag: string) => tag.trim());

        const newPost = new Post({
            userId,
            content,
            imageUrl: req.file ? req.file.path : '',
            category,
            tags: tagsArray
        });
        await newPost.save();
        res.status(StatusCodes.CREATED).json({message: "Post created successfully"});
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }
}

export const getPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(StatusCodes.NOT_FOUND).json({message: "Post not found"});
        res.json(post);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(StatusCodes.NOT_FOUND).json({message: "Post not found"});
        await post.deleteOne();
        res.json({message: "Post deleted successfully"});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }
}



export const updatePostLikes = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(StatusCodes.NOT_FOUND).json({message: "Post not found"});
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
        if(user.likedPosts?.includes(req.params.id)) {
            const index = user.likedPosts.indexOf(req.params.id);
            user.likedPosts?.splice(index, 1);
            await user.save();
            const postIndex = post.likes.indexOf(req.body.userId);
            post.likes.splice(postIndex, 1);
            await post.save();
            return res.json({message: "Post unliked successfully"});
        }
        user.likedPosts?.push(req.params.id);
        post.likes.push(req.body.userId);
        await post.save();
        await user.save();
        res.json({message: "Post liked successfully"});
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }
}

export const updatePostComments = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) return res.status(StatusCodes.NOT_FOUND).json({message: "Post not found"});
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
        post.comments.push(req.body);
        await post.save();
        res.json({message: "Comment added successfully"});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }
}
