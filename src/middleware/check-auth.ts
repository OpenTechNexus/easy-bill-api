import {NextFunction} from 'express';
import HttpError from '../errorHelpers/http-errors';
import jwt from 'jsonwebtoken';
import env from '../../environment.config';
import {CheckAuthRequestType, ResponseUserType} from '../types';

export const checkAuth = (req: CheckAuthRequestType, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw HttpError('Authentication failed', 401);
    }
    const decodedToken = jwt.verify(token, env.JWTKEY) as ResponseUserType;
    req.userData = {userId: decodedToken.id};
    next();
  } catch (err) {
    const error = HttpError('Authentication failed', 401);
    return next(error);
  }
};
