import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }
        await mongoose.connect(mongoURI);
        console.log('db connected');
    } catch (error:any) {
        console.log(error.message);
    }
}

module.exports = { dbConnect };
