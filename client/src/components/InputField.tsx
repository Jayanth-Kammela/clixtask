import React, { useState } from 'react';
import styles from '../app.module.css';
import { InputFieldProps } from '../utils/types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputField: React.FC<InputFieldProps> = ({ value, name, inputType, error, changeFunction, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <React.Fragment>
            <div className="w-full my-4 lg:w-full relative">
                <input
                    value={value}
                    type={showPassword ? 'text' : inputType}
                    name={name}
                    autoComplete="off"
                    className={`${styles.input} py-3 px-4 my-1 block w-full bg-white text-md border-solid border-2 border-neutral-300`}
                    placeholder={placeholder}
                    onChange={changeFunction}
                />
                {inputType === 'password' && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 px-3 me-4"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                )}
            </div>
            <p className="text-red-500">{error}</p>
        </React.Fragment>
    );
};

export default InputField;
