import React, { useEffect, useState } from 'react'
import { userTodos, updateTodo, deleteTodo } from '../services/services';
import toast from 'react-hot-toast'
import { UserTodo } from '../utils/types'
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { IoSave } from "react-icons/io5";
import TodoForm from '../components/TodoForm';
import { IoMdAdd } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const UserTodo = () => {
    const [todos, setTodos] = useState<UserTodo[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate=useNavigate();

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const getUserTodos = async () => {
        try {
            const response = await userTodos();
            setTodos(response.data.result)
        } catch (error: any) {
            toast.error(error.response?.data.message);
        }
    }

    useEffect(() => {
        getUserTodos()
    }, [])

    const handleEdit = (id: string) => {
        setEditingId(id);
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, title: e.target.value };
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const handleSave = async (id: string) => {
        try {
            const updatedTodo = todos.find(todo => todo._id === id);
            if (updatedTodo) {
                const response = await updateTodo(id, { title: updatedTodo.title, isComplete: updatedTodo.isComplete });
                setEditingId(null);
                toast.success(response.data?.message);
            }
        } catch (error: any) {
            console.log(error);
            console.log(error.response?.data.message);
            toast.error(error.response?.data.message);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            if (id) {
                const response = await deleteTodo(id);
                if (response.data?.status) {
                    toast.success(response.data?.message);
                    await getUserTodos()
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data.message);
        }
    }

    const handleCheckboxChange = async (id: string) => {
        const updatedTodos = todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, isComplete: !todo.isComplete };
            }
            return todo;
        });
        setTodos(updatedTodos);
        try {
            const updatedTodo = updatedTodos.filter(todo => todo._id === id)[0];
            if (updatedTodo) {
                const response = await updateTodo(id, { title: updatedTodo.title, isComplete: updatedTodo.isComplete });
                toast.success(response.data?.message);
            }
        } catch (error: any) {
            console.log(error.response?.data.message);
            toast.error(error.response?.data.message);
        }
    }

    const forhandleLogOut=()=>{
        localStorage.clear();
        navigate('/')
    }

    return (
        <React.Fragment>
            <div className="flex justify-around items-center">
                <div>
                    Add TODO
                    <button
                        onClick={handleOpenModal}
                        className="bg-blue-500 text-white font-bold p-4 rounded"
                    >
                        <IoMdAdd />
                    </button>
                </div>
                <div>
                <button
                        onClick={forhandleLogOut}
                        className="bg-blue-500 text-white font-bold p-4 rounded"
                    >
                        <IoIosLogOut />
                    </button>
                </div>
            </div>
            {isOpen && <TodoForm handleCloseModal={handleCloseModal} />}

            {
                todos.map((item: UserTodo) => {
                    return (
                        <div className="flex justify-center" key={item._id}>
                            <div className="card w-6/12 h-20 flex justify-between items-center m-2">
                                {editingId === item._id ?
                                    <input
                                        type="text"
                                        className='titleinp'
                                        onChange={(e) => handleTitleChange(e, item._id)}
                                        value={item.title}
                                    />
                                    :
                                    <React.Fragment>
                                        <input
                                            style={{ width: '20px', height: '20px' }}
                                            type="checkbox"
                                            checked={item.isComplete}
                                            onChange={() => handleCheckboxChange(item._id)}
                                        />
                                        <span style={{ textDecoration: item.isComplete ? 'line-through' : 'none' }}>{item.title}</span>
                                    </React.Fragment>
                                }
                                <div>
                                    {editingId === item._id ?
                                        <button className='btn bg-green-800 text-white p-2 m-1 rounded' onClick={() => handleSave(item._id)}><IoSave /></button>
                                        :
                                        <button className='btn bg-green-800 text-white p-2 m-1 rounded' onClick={() => handleEdit(item._id)}><MdEdit /></button>
                                    }
                                    <button className='btn bg-red-800 text-white p-2 rounded' onClick={() => handleDelete(item._id)}><AiFillDelete /></button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </React.Fragment>
    )
}

export default UserTodo;
