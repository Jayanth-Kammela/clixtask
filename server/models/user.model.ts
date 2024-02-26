import mongoose from "mongoose";
import { UserType } from '../@types/types';

const userModel = new mongoose.Schema<UserType>({
    email: {
        type: String,
        trim: true,
        required: [true, 'Please add a E-mail'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid E-mail'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please add a Password'],
        minlength: [6, 'password must have at least six(6) characters'],
    }
}, {
    timestamps: true,
})

export default mongoose.model<UserType>("UserClix", userModel);