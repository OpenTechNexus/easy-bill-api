import express from 'express';
import env from './environment.config';
import {Request, Response, NextFunction} from 'express';
import HttpError from './models/http-errors.ts';
import usersRoutes from './routes/users-routes.ts';
require('dotenv').config();

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', env.ENVIRONMENT);
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/users', usersRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError('Not Found this route', 404);
  next(error);
});

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred'});
});

app.listen(env.PORT, () => console.log(`Server started on port ${env.PORT}`));
