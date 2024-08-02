import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserDocument extends Document, IUser {
  _id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUserDocument>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }
});

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
