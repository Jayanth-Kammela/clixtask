import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (_id:string) => {
    const secret = process.env.SECRET;
    try {
        if (!secret) {
            throw new Error('SECRET must be defined');
        }
        const token = jwt.sign({ _id }, secret, { expiresIn: '1h' });

        return token;
    } catch (error) {
        console.log(error);
        
    }
};


const comparePasswords = async (enteredPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(enteredPassword, hashedPassword);
};

export { generateToken, comparePasswords };
