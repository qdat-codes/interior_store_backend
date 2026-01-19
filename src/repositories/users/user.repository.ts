import userModel from "../../models/users/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import { HttpError } from "../../utils/httpError";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const UserRepository = {
  async createUser(email: string, password: string) {
    const exist = await userModel.findOne({ email });

    if (exist) throw new HttpError(409, "Email already registered");
    const user = new userModel({ email, password });

    await user.save();
    return user;
  },

  async login(email: string, password: string) {
    const user = await userModel.findOne({ email });
    if (!user) throw new HttpError(404, "User not found");

    const comparePassword = (user as any).comparePassword as
      | ((candidatePassword: string) => Promise<boolean>)
      | undefined;
    if (!comparePassword) {
      throw new HttpError(500, "comparePassword is not available on user model");
    }

    const isMatch = await comparePassword.call(user, password);
    if (!isMatch) throw new HttpError(401, "Invalid credentials");

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
