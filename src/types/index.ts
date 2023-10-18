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

export type ResponseUserType = UserType & {
  id: string;
  _id: string;
  _v: number;
};

export type GetUsersResponse = {
  users: Omit<ResponseUserType, 'password'>[];
};

export type CreateUserRequestType = Request & {
  body: UserType;
};

export type CheckAuthRequestType = Request & {
  headers: {
    authorization?: string;
  };
  userData?: {
    userId: string;
  };
};
