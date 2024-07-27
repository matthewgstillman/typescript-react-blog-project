import { Document } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage?: string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserDocument extends Document, IUser {
}
