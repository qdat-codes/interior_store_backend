import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, USER_ROLE } from "../contants/contant";

// general token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId, role: USER_ROLE.USER }, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
