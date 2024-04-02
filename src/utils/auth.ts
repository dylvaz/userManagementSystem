import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/user';

interface TokenPayload {
  user: UserDocument;
  iat: number;
  exp: number;
}

export const getUserFromToken = (token: string): UserDocument | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    return decoded.user;
  } catch (error) {
    return null;
  }
};
