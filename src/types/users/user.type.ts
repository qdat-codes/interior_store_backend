import { Document, Types } from "mongoose";

export interface UserType extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  address?: string;
  phone?: string;
  avatar?: string;
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
