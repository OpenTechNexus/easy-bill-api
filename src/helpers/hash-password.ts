import bcrypt from 'bcryptjs';
import HttpError from '../errorHelpers/http-errors';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    return hashedPassword;
  } catch (err) {
    throw HttpError('Could not hash the password', 500);
  }
};
