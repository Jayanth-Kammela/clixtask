import axios from "axios"
import { userSignIn } from "../utils/types";

const url = 'http://localhost:8486'

export const userSigin = async (data: userSignIn) => {
    const response = await axios.post(`${url}/user/signin`, data);
    return response
}

export const userSignup = async (data: userSignIn) => {
    const response = await axios.post(`${url}/user/signup`, data);
    return response
}

export const postTodo = async (data: any) => {
    const token = await localStorage.getItem("token");
    const response = await axios.post(`${url}/todo/post`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const userTodos = async () => {
    const token = await localStorage.getItem("token");
    const response = await axios.get(`${url}/todo/get`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const updateTodo = async (id: string, data: any) => {
    const token = await localStorage.getItem("token");
    const response = await axios.patch(`${url}/todo/update/${id}`,data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

export const deleteTodo = async (id: string) => {
    const token = await localStorage.getItem("token");
    const response = await axios.delete(`${url}/todo/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}