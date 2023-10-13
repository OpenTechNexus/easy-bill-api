import {Request, Response, NextFunction} from 'express';
import {v4 as uuidv4} from 'uuid';
import HttpError from '../models/http-errors';

const USERS = [{id: 'u1', name: 'Name Lastname', email: 'test@test.com', password: 'test123'}];

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  res.json({users: USERS});
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
  const {name, email, password} = req.body;

  const hasUser = USERS.find(u => u.email === email);

  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 401);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  USERS.push(createdUser);

  res.status(201).json({user: createdUser});
};
