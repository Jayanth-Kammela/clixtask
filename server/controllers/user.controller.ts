import userModel from "../models/user.model";
const { success, error } = require('../utils/response')
import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { generateToken, comparePasswords } from "../utils/helper";

const userSignUp = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userCheck = await userModel.findOne({ email });

        if (userCheck) {
            return res.status(400).send(error(400, 'User already Exits'));
        }
        const salt = 10
        const hash = await bcrypt.hash(password, salt)
        const user = await userModel.create({ email, password: hash });
        await user.save()
        const token = await generateToken(user._id.toString());
        return res.status(201).send(success(201, "User registered successfully", { email: email, tokens: token }));
    }
    catch (err: any) {
        console.log(err);
        return res.status(500).send(error(500, err.message));
    }
}

const userSignIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) {
            return res.status(400).send(error(400, 'Email & Password is required'));
        }
        const userCheck = await userModel.findOne({ email });

        if (!userCheck) {
            return res.status(404).send(error(404, 'User not found!'));
        }

        const isValidPassword = await comparePasswords(password, userCheck.password);

        if (!isValidPassword) {
            return res.status(400).send(error(400, 'Invalid password'));
        }

        const token = await generateToken(userCheck._id.toString());
        return res.status(201).send(success(201, "User loggedin successfully", { email: email, token: token }));
    } catch (error:any) {
        console.log(error);
        return res.status(500).send(error(500, error.message));
    }

}

module.exports = { userSignUp, userSignIn }