import { UserRepository } from "../../repositories/users/user.repository";
import { UserType } from "../../types/index.type";

export const UserService = {
  async createUser(email: string, password: string, username: string) {
    try {
      const user = await UserRepository.createUser(email, password, username);
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

  async logout(token: string) {
    try {
      const user = await UserRepository.logout(token);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getAllUser(page: number = 1, limit: number = 10) {
    try {
      const users = await UserRepository.getAllUser(page, limit);
      return users;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(userId: string) {
    try {
      const user = await UserRepository.getUserById(userId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getUserBySearch(search: string, page: number = 1, limit: number = 10) {
    try {
      const user = await UserRepository.getUserBySearch(search, page, limit);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(userId: string, data: Partial<UserType>) {
    try {
      const user = await UserRepository.updateUser(userId, data);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(userId: string) {
    try {
      const user = await UserRepository.deleteUser(userId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async addFavoriteProduct(userId: string, productId: string) {
    try {
      const user = await UserRepository.addFavoriteProduct(userId, productId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async removeFavoriteProduct(userId: string, productId: string) {
    try {
      const user = await UserRepository.removeFavoriteProduct(userId, productId);
      return user;
    } catch (error) {
      throw error;
    }
  },

  async getAllFavoriteProduct(page: number = 1, limit: number = 10) {
    try {
      const user = await UserRepository.getAllFavoriteProduct(page, limit);
      return user;
    } catch (error) {
      throw error;
    }
  },



};
