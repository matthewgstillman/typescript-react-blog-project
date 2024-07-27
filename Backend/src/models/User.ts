import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

interface IUserDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
  _id: Schema.Types.ObjectId;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }
});

UserSchema.methods.matchPassword = async function(this: IUserDocument, enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUserDocument>('User', UserSchema);
export default User;
export { IUserDocument };
