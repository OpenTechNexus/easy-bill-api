import mongoose, {Document, Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true, minlength: 6},
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
