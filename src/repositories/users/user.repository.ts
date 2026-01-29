import userModel from "../../models/users/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import jwt from "jsonwebtoken";
import { HttpError } from "../../utils/httpError";
import { REFRESH_TOKEN_SECRET } from "../../contants/contant";
import { UserType } from "../../types/index.type";

export const UserRepository = {
  async createUser(email: string, password: string, username: string) {
    const exist = await userModel.findOne({ email });

    if (exist) throw new HttpError(409, "Email already registered");
    const user = new userModel({ email, password, username });

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

  async logout(token: string) {
    try {
      const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as {
        userId: string;
      };
      const user = await userModel.findByIdAndUpdate(decoded.userId, { refreshToken: null });
      return user;
    } catch {
      throw new Error("Invalid refresh token");
    }
  },


  async getUserById(userId: string) {
    try {
      const user = await userModel.findById(userId);
      return user;
    } catch {
      throw new Error("User not found");
    }
  },

  async getUserBySearch(search: string, page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const pageCondition: any = {};
      if (search) {
        pageCondition.$or = [{ email: { $regex: search, $options: "i" } }, { fisrtName: { $regex: search, $options: "i" } }, { lastName: { $regex: search, $options: "i" } }];
      }
      const user = await userModel.find(pageCondition).skip(skip).limit(limit);
      const total = await userModel.countDocuments(pageCondition);
      const totalPages = Math.ceil(total / limit);
      return {
        data: user,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch {
      throw new Error("User not found");
    }
  },

  async updateUser(userId: string, data: Partial<UserType>) {
    try {
      const user = await userModel.findByIdAndUpdate(userId, data, { new: true });
      return user;
    } catch {
      throw new Error("User not found");
    }
  },

  async deleteUser(userId: string) {
    try {
      const user = await userModel.findByIdAndDelete(userId);
      return user;
    } catch {
      throw new Error("User not found");
    }
  },

  async addFavoriteProduct(userId: string, productId: string) {
    try {
      const user = await userModel.findByIdAndUpdate(userId, { $push: { favoriteProducts: productId } }, { new: true });
      return user;
    } catch {
      throw new Error("User not found");
    }
  },

  async removeFavoriteProduct(userId: string, productId: string) {
    try {
      const user = await userModel.findByIdAndUpdate(userId, { $pull: { favoriteProducts: productId } }, { new: true });
      return user;
    } catch {
      throw new Error("User not found");
    }
  },


  async getAllFavoriteProduct(page: number = 1, limit: number = 10) {
    try {
      const allFavoriteProducts = await userModel.find();
      const total = await userModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
      return {
        data: allFavoriteProducts,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch {
      throw new Error("User not found");
    }
  },


  async getAllUser(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
      const users = await userModel.find().skip(skip).limit(limit);
      const total = await userModel.countDocuments();
      const totalPages = Math.ceil(total / limit);
      return {
        data: users,
        pagination: {
          total,
          page,
          totalPages,
          limit,
        },
      };
    } catch {
      throw new Error("User not found");
    }
  },
}
