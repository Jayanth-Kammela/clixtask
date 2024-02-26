import React, { useEffect, useState } from 'react'
import InputField from './InputField';
import { postTodo, userTodos } from '../services/services';
import toast from 'react-hot-toast';

const TodoForm = ({ handleCloseModal }: any) => {

    const [form, setForm] = useState({ title: '', isChecked: false });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const getUserTodos = async () => {
        try {
            await userTodos();
        } catch (error: any) {
            toast.error(error.response?.data.message);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await postTodo(form);
            if (response.data?.status) {
                toast.success(response.data?.message);
                await getUserTodos();
                handleCloseModal();
            }
        } catch (error: any) {
            toast.error(error.response?.data.message);
        }
    };

    useEffect(() => {
        getUserTodos()
    }, [])


    return (
        <div>
            <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Add TODO</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <InputField
                                inputType="text"
                                name="title"
                                value={form.title}
                                changeFunction={handleInputChange}
                                placeholder="Enter title"
                            />
                        </div>
                        <div className="mb-4">
                            <input style={{ width: '20px', height: '20px' }}
                                type="checkbox"
                                id="checkbox1"
                                name="isChecked"
                                checked={form.isChecked}
                                onChange={handleInputChange}
                                className="mr-2"
                            />
                            <label htmlFor="checkbox1">IsComplete</label>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-700 w-full text-white font-bold py-2 px-4 rounded my-1"
                        >
                            Submit
                        </button>
                        {/* <Button color='red' clickFuntion={handleCloseModal} btnName='Close'/> */}
                        <button
                            onClick={handleCloseModal}
                            className="bg-red-700 w-full text-white font-bold py-2 px-4 rounded mt-1"
                        >
                            Close
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TodoForm