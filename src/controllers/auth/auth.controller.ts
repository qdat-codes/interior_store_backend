import userModel from "../../models/users/user.model";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { userService } from "../../services/user/user.service";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const user = await userService.createUser(username, email, password);
      res.status(201).json({
        message: "User registered",
        user,
      });
    } catch (error) {
      console.error("Error when register", error);
      res.status(500).json({ message: "Sever error", error: error });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, accessToken, refreshToken } = await userService.login(
        email,
        password
      );

      res.status(200).json({
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      console.log("Error when login: ", error);
      res.status(500).json({ message: "Sever error", error: error });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const accessToken = await userService.refreshToken(token);
      res.status(200).json({
        accessToken,
      });
    } catch (error: any) {
      console.error("Error when get accessToken", error);
      res.status(400).json({ error: error.message });
    }
  },
};
