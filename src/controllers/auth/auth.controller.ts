import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/users/user.service";
import { HttpError } from "../../utils/httpError";
import validator from "validator";

export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, username } = req.body;

      if (!email || !password) {
        throw new HttpError(400, " email, password are required");
      }

      if (!validator.isEmail(email)) {
        throw new HttpError(400, "email is not valid");
      }

      if (!username) {
        throw new HttpError(400, "username is required");
      }

      if (String(password).length < 6) {
        throw new HttpError(400, "password must be at least 6 characters");
      }

      const { user, accessToken, refreshToken } = await UserService.createUser(email, password, username);
      // set refresh token vào cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // chỉ có thể truy cập thông qua HTTP (không thể truy cập thông qua JavaScript)
        secure: process.env.NODE_ENV === "production", // chỉ có thể truy cập thông qua HTTPS trong môi trường production
        sameSite: "lax", // chỉ có thể truy cập thông qua cùng domain
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      res.status(201).json({ user, accessToken });
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new HttpError(400, "email and password are required");
      }

      const { user, accessToken, refreshToken } = await UserService.login(
        email,
        password
      );

      // set refresh token vào cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // chỉ có thể truy cập thông qua HTTP (không thể truy cập thông qua JavaScript)
        secure: process.env.NODE_ENV === "production", // chỉ có thể truy cập thông qua HTTPS trong môi trường production
        sameSite: "lax", // chỉ có thể truy cập thông qua cùng domain
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.status(200).json({
        accessToken,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body; // refresh token

      if (!token) {
        throw new HttpError(400, "token is required");
      }

      const accessToken = await UserService.refreshToken(token);
      res.status(200).json(accessToken);
    } catch (error: any) {
      next(error);
    }
  },

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.body; // refresh token
      if (!token) {
        throw new HttpError(400, "token is required");
      }

      // xóa refresh token khỏi cookie
      res.clearCookie("refreshToken");
      
      const user = await UserService.logout(token);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};
