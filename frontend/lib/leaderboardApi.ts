import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/leaderboard`; 

interface Leaderboard {
  rank: number;
  username: string;
  score: number;
}

const leaderboardRoutes = {
  // Get global leaderboard
  getGlobalLeaderboard: async () => {
    try {
      const response = await axios.get<Leaderboard[]>(`${BASE_URL}/global`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get PvP leaderboard
  getPvPLeaderboard: async () => {
    try {
      const response = await axios.get<Leaderboard[]>(`${BASE_URL}/pvp`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get missions leaderboard
  getMissionsLeaderboard: async () => {
    try {
      const response = await axios.get<Leaderboard[]>(`${BASE_URL}/missions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get weekly leaderboard
  getWeeklyLeaderboard: async () => {
    try {
      const response = await axios.get<Leaderboard[]>(`${BASE_URL}/weekly`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user rank
  getUserRank: async () => {
    try {
      const response = await axios.get<{ rank: number; score: number }>(
        `${BASE_URL}/user-rank`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default leaderboardRoutes;
