import { Request, Response } from "express";
import todoModel from "../models/todo.model";
const { success, error } = require('../utils/response')


const postTodo = async (req: Request, res: Response) => {

    try {
        const todo = await todoModel.create(req.body);
        await todo.save();
        return res.status(201).send(success(201, "Todo created successfully", todo));
    } catch (err: any) {
        return res.status(400).send(error(400, err.message));
    }
}

const getTodo = async (req: Request, res: Response) => {
    const userId = req.body.userId.toString();

    try {
        const userTodo = await todoModel.find({ userId: userId });

        if (!userTodo) {
            return res.status(404).send(error(400, "No todos found for the user"));
        }
        return res.status(201).send(success(201, "Todo details", userTodo));
    } catch (err: any) {
        return res.status(400).send(error(400, err.message));
    }
}

const updateTodo = async (req: Request, res: Response) => {
    const { Id } = req.params
    
    try {
        const todoCheck = await todoModel.find({ _id: Id });

        if (!todoCheck) {
            return res.status(404).send(error(400, "No todos found for the user"));
        }
        const userTodo = await todoModel.findByIdAndUpdate({ _id: Id }, { $set: req.body }, { new: true })
        return res.status(201).send(success(201, "Updated todo successfully", userTodo));
    } catch (err: any) {

    }
}

const deleteTodo = async (req: Request, res: Response) => {
    const { Id } = req.params;
    console.log(Id);
    

    try {
        const todoCheck = await todoModel.find({ _id: Id });

        if (!todoCheck) {
            return res.status(404).send(error(400, "No todos found for the user"));
        }
        const userTodo = await todoModel.findByIdAndDelete({ _id: Id })
        return res.status(201).send(success(201, "Todo deleted successfully", userTodo));
    } catch (err: any) {
        return res.status(404).send(error(400, err.message));
    }

}

module.exports = { postTodo, getTodo, updateTodo, deleteTodo }