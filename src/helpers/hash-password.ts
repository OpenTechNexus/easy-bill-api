import bcrypt from 'bcryptjs';
import HttpError from '../models/http-errors';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  } catch (err) {
    throw new HttpError('Could not hash the password', 500);
  }
};
