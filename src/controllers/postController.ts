import { Request, Response } from "express";
import Post from "../models/postModel";
import User from "../models/userModel";
import { StatusCodes } from "http-status-codes";

export const createPost = async (req: Request, res: Response) => {
    try {
        const {userId, content, imageUrl, category, tags} = req.body;
        const newPost = new Post({
            userId,
            content,
            imageUrl,
            category,
            tags
        });
        await newPost.save();
        res.status(StatusCodes.CREATED).json({message: "Post created successfully"});
    } catch (error) {
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

export const savePost = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(StatusCodes.NOT_FOUND).json({message: "Post not found"});
        const user = await User.findById(req.body.userId);
        if (!user) return res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
        if(user.savedPosts?.includes(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({message: "Post already saved"});
        user.savedPosts?.push(req.params.id);
        await user.save();
        res.json({message: "Post saved successfully"});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Something went wrong"});
    }
}
