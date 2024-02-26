import mongoose from "mongoose";
import { TodoType } from "../@types/types";

const todoModel = new mongoose.Schema<TodoType>({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        minlength: [6, 'Title must have at least six(6) characters'],
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    userId:{
        type:String
    }
})

export default mongoose.model<TodoType>("TodoClix", todoModel);