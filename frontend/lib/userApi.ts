import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users`;

interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
}

interface UserStats {
  gamesPlayed: number;
  gamesWon: number;
  highScore: number;
}

const userRoutes = {
  // Get current user details
  getCurrentUser: async () => {
    try {
      const response = await axios.get<User>(`${BASE_URL}/me`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update current user details
  updateCurrentUser: async (data: { username?: string; email?: string }) => {
    try {
      const response = await axios.put<User>(`${BASE_URL}/me`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get current user stats
  getCurrentUserStats: async () => {
    try {
      const response = await axios.get<UserStats>(`${BASE_URL}/me/stats`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update current user avatar
  updateAvatar: async (avatarData: FormData) => {
    try {
      const response = await axios.put(`${BASE_URL}/avatar`, avatarData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete current user's account
  deleteAccount: async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/me`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default userRoutes;
