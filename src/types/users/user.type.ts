import { Document, Types } from "mongoose";
import { USER_ROLE } from "../../contants/contant";

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export interface UserType extends Document {
  _id: Types.ObjectId;
  fisrtName?: string;
  lastName?: string;
  email: string;
  password: string;
  role: UserRole;
  address?: string;
  phone?: string;
  avatar?: string;
  favoriteProducts?: Types.ObjectId[];
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
