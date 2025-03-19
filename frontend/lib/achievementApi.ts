import axios from "axios";

// Define a base URL for the API
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/achievements`;

interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
}

const achievementRoutes = {
  // Get all achievements
  getAchievements: async () => {
    try {
      const response = await axios.get<Achievement[]>(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user achievements
  getUserAchievements: async () => {
    try {
      const response = await axios.get<Achievement[]>(`${BASE_URL}/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific achievement by ID
  getAchievement: async (id: string) => {
    try {
      const response = await axios.get<Achievement>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default achievementRoutes;
