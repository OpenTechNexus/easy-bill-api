import {Request, Response, NextFunction} from 'express';
import HttpError from '../models/http-errors';
import {validationResult} from 'express-validator';
import User, {IUser} from '../schemas/user';
import bcrypt from 'bcryptjs';
import {GetUsersResponse, CreateUserRequestType, ResponceUserType} from '../types';

const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  } catch (err) {
    throw new HttpError('Could not hash the password', 500);
  }
};

const createUser = async (name: string, email: string, hashedPassword: string): Promise<IUser> => {
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    return user;
  } catch (err) {
    throw new HttpError('User not created', 500);
  }
};

export const getUsers = async (
  req: Request,
  res: Response<GetUsersResponse>,
  next: NextFunction,
) => {
  try {
    const users = await User.find({}, '-password');
    res.json({users: users.map(user => user.toObject({getters: true}))});
  } catch (err) {
    const error = new HttpError('Fetching users failed.', 500);
    return next(error);
  }
};

export const signUp = async (
  req: CreateUserRequestType,
  res: Response<{user: ResponceUserType}>,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data', 422));
    }

    const {name, email, password} = req.body;

    let existingUser;

    try {
      existingUser = await User.findOne({email});
      if (existingUser) {
        return next(new HttpError('User exists already, please login instead', 422));
      }

      const hashedPassword = await hashPassword(password);
      const createdUser = await createUser(name, email, hashedPassword);

      res.status(201).json({user: createdUser.toObject({getters: true})});
    } catch (err) {
      return next(new HttpError('Signing up failed, please try again later', 500));
    }
  } catch (error) {
    return next(error);
  }
};
