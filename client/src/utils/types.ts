export interface InputFieldProps {
    name: string;
    inputType: string;
    changeFunction: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error?: string;
    value?: any;
}

export interface userSignIn {
    email?: string;
    password?: string;
}

export interface errorsSignIn {
    email?: string;
    password?: string;
}

export interface ButtonProps {
    color: string;
    btnName: string;
    clickFuntion: (e: any) => void;
}

export interface UserTodo {
    isComplete: boolean;
    title: string;
    _id: string;
}