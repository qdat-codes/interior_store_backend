import { UserRepository } from "../../repositories/users/user.repository";

export const UserService = {
  async createUser(email: string, password: string) {
    try {
      const user = await UserRepository.createUser(email, password);
      return user;
    } catch (error) {
      throw error;
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
      throw error;
    }
  },

  async refreshToken(token: string) {
    try {
      const newAccessToken = await UserRepository.refreshToken(token);
      return newAccessToken;
    } catch (error) {
      throw error;
    }
  },
};
