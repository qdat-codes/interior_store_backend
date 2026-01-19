import { Document, Types } from "mongoose";
import { USER_ROLE } from "../../contants/contant";

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface UserType extends Document {
  _id: Types.ObjectId;
  username: string;
  email?: string;
  password: string;
  role: UserRole;
  address?: string;
  phone?: string;
  avatar?: string;
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
