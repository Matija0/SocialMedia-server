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
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { 
    type: String, 
    required: [true, 'Content is required'], 
    minlength: [10, 'Content must be at least 10 characters long'],
    maxlength: [500, 'Content cannot exceed 500 characters']
  },
  imageUrl: { 
    type: String,
    required: true
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  comments: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      content: { 
        type: String, 
        required: true,
        minlength: 1,
        maxlength: 200
      },
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
    ],
    required: [true, 'Category is required']
  },
  tags: [{ type: String, required: false }],
  timestamp: { type: Date, default: Date.now },
});

const Post = model<IPost>("Post", postSchema);

export default Post;
