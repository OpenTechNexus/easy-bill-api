import express from 'express';
import env from './environment.config';
import {Request, Response, NextFunction} from 'express';
import HttpError from './src/errorHelpers/http-errors';
import usersRoutes from './src/routes/users-routes.ts';
import mongoose from 'mongoose';
import { IHttpError } from './src/types/index.ts';

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', env.ENVIRONMENT);
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

app.use('/users', usersRoutes);

app.use((req: Request, res: Response) => {
  const error = HttpError('Not Found this route', 404);
  res.status(error.code || 500);
  res.json({message: error.message});
});

app.use((error: IHttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'Unknown error'});
});

mongoose
  .connect('mongodb+srv://admin:admin159357@cluster0.gmb69ng.mongodb.net/')
  .then(() => {
    app.listen(process.env.PORT || 5001);
  })
  .catch(err => {
    // eslint-disable-next-line
    console.log(err);
  });
