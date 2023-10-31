import {Request, Response, NextFunction} from 'express';
import HttpError from '../models/http-errors';
import {validationResult} from 'express-validator';
import User from '../schemas/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../../environment.config';
import {hashPassword, createUser} from '../helpers'
import {
  GetUsersResponse,
  CreateUserRequestType,
  ResponseUserType,
  RequestSignInType,
  ResponseSignInType,
} from '../types';

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
  res: Response<{user: ResponseUserType}>,
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

export const signIn = async (
  req: RequestSignInType,
  res: Response<ResponseSignInType>,
  next: NextFunction,
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }
  const {email, password} = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    const error = new HttpError('Sign in failed', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Invalid email or password', 401);
    return next(error);
  }

  let isValidPassword = false;

  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError('Invalid sign in, try again', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid email or password', 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign({userId: existingUser.id, email: existingUser.email}, env.JWTKEY, {
      expiresIn: '1h',
    });
  } catch (err) {
    const error = new HttpError('Signin failed, please try again', 500);
    return next(error);
  }
  res.json({id: existingUser.id, userName: existingUser.name, token: token});
};
