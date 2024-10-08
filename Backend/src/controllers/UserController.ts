import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import User, { IUserDocument } from '../models/User';
import generateToken from '../utils/generateToken';

interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password
    }) as IUserDocument;

    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user._id.toString())
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    const err = error as Error;
    console.error('Error during user registration:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }) as IUserDocument | null;

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


export const getUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user?._id) as IUserDocument | null;

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileImage: user.profileImage
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export const updateUserProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = await User.findById(req.user?._id) as IUserDocument | null;

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.profileImage = req.body.profileImage || user.profileImage;

    const updatedUser = await user.save() as IUserDocument;

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id.toString())
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
