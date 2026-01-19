import userModel from "../../models/users/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const UserRepository = {
  async createUser(username: string, email: string, password: string) {
    const exist = await userModel.findOne({ email });

    if (exist) throw new Error("Email already registered");
    const user = new userModel({ username, email, password });

    await user.save();
    return user;
  },

  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return { user, accessToken, refreshToken };
  },

  async refreshToken(token: string) {
    try {
      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
        userId: string;
      };
      const accessToken = generateAccessToken(decoded.userId);
      return accessToken;
    } catch {
      throw new Error("Invalid refresh token");
    }
  },
};
