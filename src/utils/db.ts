import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";
        await mongoose.connect(mongoURI);
        console.log("MongoDB connection SUCCESS");
    } catch (error: any) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;