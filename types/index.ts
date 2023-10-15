import {Request} from 'express';

export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type RequestSignInType = {
  body: Omit<UserType, 'name'>;
};

export type ResponseSignInType = {
  resultCode: number;
  isAuth: boolean;
  userName: string;
  token: string;
};

export type ResponceUserType = {
  name: string;
  id: string;
  _id: string;
  _v: number;
  email: string;
  password: string;
};

export type GetUsersResponse = {
  users: Omit<ResponceUserType, 'password'>[];
};

export type CreateUserRequestType = Request & {
  body: UserType;
};
