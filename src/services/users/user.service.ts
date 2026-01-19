import userModel from "../../models/users/user.model";
import { UserRepository } from "../../repositories/users/user.repository";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const UserService = {
  async createUser(username: string, email: string, password: string) {
    try {
      const user = await UserRepository.createUser(username, email, password);
      return user;
    } catch (error) {
      throw new Error("Failed to create user: " + error);
    }
  },

  async login(email: string, password: string) {
    try {
      const { user, accessToken, refreshToken } = await UserRepository.login(
        email,
        password
      );
      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error("Failed to login user: " + error);
    }
  },

  async refreshToken(token: string) {
    try {
      const newAccessToken = await UserRepository.refreshToken(token);
      return newAccessToken;
    } catch (error) {
      throw new Error("Failed to refresh token: " + error);
    }
  },
};
