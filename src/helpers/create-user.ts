import HttpError from '../models/http-errors';
import User, {IUser} from '../schemas/user';

export const createUser = async (
  name: string,
  email: string,
  hashedPassword: string,
): Promise<IUser> => {
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    return user;
  } catch (err) {
    throw new HttpError('User not created', 500);
  }
};
