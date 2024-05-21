import mongoose, { Document, Schema, model } from "mongoose";

interface IPost extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  imageUrl: string;
  likes: mongoose.Types.ObjectId[];
  comments: {
    userId: mongoose.Types.ObjectId;
    content: string;
    timestamp: Date;
  }[];
  category: {
    enum: [
      "Frontend",
      "Backend",
      "Fullstack",
      "DevOps",
      "Mobile",
      "UI/UX",
      "Data Science",
      "Cybersecurity",
      "AI/ML",
      "Cloud Computing",
      "Game Development",
      "Blockchain",
      "AR/VR",
      "IoT",
      "Quantum Computing"
    ];
  };
  tags: string[];
  timestamp: Date;
}

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  imageUrl: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  category: {
    type: String,
    enum: [
      "Frontend",
      "Backend",
      "Fullstack",
      "DevOps",
      "Mobile",
      "UI/UX",
      "Data Science",
      "Cybersecurity",
      "AI/ML",
      "Cloud Computing",
      "Game Development",
      "Blockchain",
      "AR/VR",
      "IoT",
      "Quantum Computing",
    ],
  },
  tags: {
    type: [String],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Post = model<IPost>("Post", postSchema);

export default Post;
