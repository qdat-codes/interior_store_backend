import jwt from "jsonwebtoken";
import { USER_ROLE } from "../contants/contant";

const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "access_secret_key";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret_key";

// general token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId, role: USER_ROLE.USER }, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId}, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
