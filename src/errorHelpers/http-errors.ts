import {IHttpError} from '../types';

function createHttpError(message: string, errorCode: number): IHttpError {
  const error: IHttpError = new Error(message) as IHttpError;
  error.code = errorCode;
  return error;
}

export default createHttpError;
