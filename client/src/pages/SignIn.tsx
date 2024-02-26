import React, { FormEvent, useState } from 'react'
import InputField from '../components/InputField'
import { errorsSignIn, userSignIn } from '../utils/types';
import Button from '../components/Button';
import styles from "../app.module.css";
import { userSigin } from '../services/services';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [form, setForm] = useState<userSignIn>({ email: '', password: '' });
    const [errors, setErrors] = useState<errorsSignIn>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    // const[user,setUser]=useState({})


    const validateForm = () => {
        let validationErrors: errorsSignIn = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

        //email
        if (!form.email) validationErrors.email = "Email is required";
        else if (!emailRegex.test(form.email)) validationErrors.email = "Invalid email format";

        //password
        if (!form.password) validationErrors.password = "Password is required";
        else if (form.password.length < 8) validationErrors.password = "Password should be at least 8 characters long";
        else if (!passwordRegex.test(form.password)) validationErrors.password = "Password should contain at least one special character";


        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    };

    const forFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const forSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (validateForm()) {
                setLoading(true)
                const response = await userSigin(form);
                if (response.data.status) {
                    toast.success(response.data?.message)
                    setLoading(false);
                    localStorage.setItem('token', response.data?.result.token);
                    localStorage.setItem('email', response.data?.result.email);
                    navigate('/user-todos')
                }
            }
        } catch (error: any) {
            console.log(error)
            setLoading(false);
            toast.error(error.response?.data.message)
        }
    }
    return (
        <React.Fragment>
            <div className={styles.container}>
                <form className={styles.formContainer} action="">
                    <div className="flex justify-center">
                        <p>Sign In</p>
                    </div>
                    <InputField value={form.email} name='email' inputType='email' placeholder='Enter email' changeFunction={forFormChange} error={errors.email} />
                    <InputField value={form.password} name='password' inputType='password' placeholder='Enter password' changeFunction={forFormChange} error={errors.password} />
                    <Button color='blue' btnName={loading ? 'Loading...' : 'Sign In'} clickFuntion={forSubmit} />
                    <div className="text-center my-3">
                        Don't have an account? <a className='text-blue-700 cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</a>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}

export default SignIn