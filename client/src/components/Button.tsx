import React from 'react'
import { ButtonProps } from '../utils/types'

const Button:React.FC<ButtonProps> = ({ color, btnName, clickFuntion }) => {
    
    return (
        <React.Fragment>
            <div>
            <button type="button" className={`bg-${color}-700 text-white py-1 px-4 rounded w-full`} onClick={clickFuntion}>
                {btnName}
            </button>
            </div>
        </React.Fragment>
    )
}

export default Button