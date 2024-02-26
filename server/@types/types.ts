import mongoose from "mongoose";

export interface UserType{
    email:string;
    password:string;
}

export interface CustomError {
    message: string;
}

export interface SuccessResponse {
    status: boolean;
    statusCode: number;
    message: string;
    result: any;
}

export interface ErrorResponse {
    status: boolean;
    statusCode: number;
    message: string;
}

export interface TodoType{
    title:string;
    isComplete:boolean;
    userId:string;
}