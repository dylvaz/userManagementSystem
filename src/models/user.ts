import mongoose, { Schema, Document } from 'mongoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  _id!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

export interface UserDocument extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
