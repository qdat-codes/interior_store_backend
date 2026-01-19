import userModel from "../../models/users/user.model";
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { UserService } from "../../services/users/user.service";

export const authController = {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const user = await UserService.createUser(username, email, password);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error when register", error);
      res.status(500).json({ message: "Sever error", error: error });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const { user, accessToken, refreshToken } = await UserService.login(
        email,
        password
      );

      res.status(200).json({
        accessToken,
        refreshToken,
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "Sever error", error: error });
    }
  },

  async refresh(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const accessToken = await UserService.refreshToken(token);
      res.status(200).json(accessToken);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },
};
