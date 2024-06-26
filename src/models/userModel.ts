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
    likedPosts?: string[];
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
    githubLink: {
        type: String,
        default: "",
        required: false,
        validate: {
          validator: function(v: string) {
            return v === "" || /^https?:\/\/github.com\/[A-Za-z0-9_-]+$/.test(v);
          },
          message: (props: { value: string }) => `${props.value} is not a valid GitHub profile URL!`
        }
      },
      country: {
        type: String,
        default: "",
        required: false,
        validate: {
          validator: function(v: string) {
            return v === "" || /^[A-Za-z\s]+$/.test(v);
          },
          message: (props: { value: string }) => `${props.value} is not a valid country name!`
        }
      },
      tags: [{ type: String, required: false }],
      likedPosts: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "Post"
      },
})

const User = model<IUser>("User", userSchema);

export default User;