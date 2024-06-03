import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    let isAdmin = false;
    if (email === process.env.ADMIN_EMAIL) isAdmin = true;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }
    const { profilePicture, bio, country, tags } = req.body;
    // Split the tags string into an array of tags
    const tagsArray = tags.split(",").map((tag: string) => tag.trim());
    req.body.tags = tagsArray;
    const image = req.file ? req.file.path : profilePicture;
    await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profilePicture: image },
      { new: true }
    );
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid credentials" });
    const jwtSecret = process.env.JWT_SECRET || "";
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "24h" });
    res.json({
      token,
      userID: user._id,
      username: user.username,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user || !currentUser)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    if (currentUser.following?.includes(req.params.id)) {
      const index = currentUser.following.indexOf(req.params.id);
      currentUser.following.splice(index, 1);
      await currentUser.save();
      const userIndex = user.followers?.indexOf(req.body.userId);
      if (typeof userIndex === "number") {
        user.followers?.splice(userIndex, 1);
        await user.save();
      }
      return res.json({ message: "User unfollowed successfully" });
    }
    currentUser.following?.push(req.params.id);
    await currentUser.save();
    user.followers?.push(req.body.userId);
    await user.save();
    res.json({ message: "User followed successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};
