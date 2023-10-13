import {Request, Response, NextFunction} from 'express';
import {v4 as uuidv4} from 'uuid';
import HttpError from '../models/http-errors';
import {validationResult} from 'express-validator';
import User from '../schemas/user';

const USERS = [{id: 'u1', name: 'Name Lastname', email: 'test@test.com', password: 'test123'}];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json({users: USERS});
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data', 422));
  }
  const {name, email, password} = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({email: email});
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User exists already, please login instead', 422);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Sugning up failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({user: createdUser.toObject({getters: true})});
};
