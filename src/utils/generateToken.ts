import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user';

export default (user: UserDocument): string => {
  return jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};
