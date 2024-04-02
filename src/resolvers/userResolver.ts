import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import bcrypt from 'bcryptjs';

import { UserInput } from './userInput';
import { User, UserDocument, UserModel } from '../models/user';
import generateToken from '../utils/generateToken';

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    try {
      const users = await UserModel.find();
      return users.map((user) => ({ ...user.toObject(), _id: user._id.toString() }));
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  @Mutation(() => String)
  async register(@Arg('input') userInput: UserInput): Promise<string> {
    const { username, email, password } = userInput;

    try {
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await hashPassword(password);
      const user = new UserModel({ username, email, password: hashedPassword });
      await user.save();
      return 'User registered successfully';
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Failed to register user');
    }
  }

  @Mutation(() => String)
  async login(@Arg('email') email: string, @Arg('password') password: string): Promise<string> {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error('User not found');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      const token = generateToken(user);
      return token;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Failed to log in');
    }
  }
}

async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}
