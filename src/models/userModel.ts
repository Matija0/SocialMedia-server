import mongoose, { Document, Schema, model } from 'mongoose';


interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    bio?: string;
    followers?: string[];
    following?: string[];
    isAdmin?: boolean;
    createdAt?: string;
    country?: string;
    githubLink?: string;
    tags?: string[];
    verified?: boolean;
    savedPosts?: string[];
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bio: {
        type: String,
        default: "",
        maxlength: 200,
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    },
    country: {
        type: String,
        default: "",
    },
    githubLink: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: [],
    },
    verified: {
        type: Boolean,
        default: false,
    },
    savedPosts: {
        type: [String],
        default: [],
    },
})

const User = model<IUser>("User", userSchema);

export default User;