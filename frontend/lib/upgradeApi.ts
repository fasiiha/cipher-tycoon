import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/upgrades`;

interface Upgrade {
  id: string;
  name: string;
  description: string;
  level: number;
  price: number;
}

interface UserUpgrade {
  id: string;
  upgradeId: string;
  level: number;
  purchasedAt: string;
}

const upgradeRoutes = {
  // Get all upgrades
  getUpgrades: async () => {
    try {
      const response = await axios.get<Upgrade[]>(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific upgrade by ID
  getUpgrade: async (id: string) => {
    try {
      const response = await axios.get<Upgrade>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Purchase an upgrade
  purchaseUpgrade: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/${id}/purchase`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upgrade level
  upgradeLevel: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/${id}/upgrade`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user upgrades
  getUserUpgrades: async () => {
    try {
      const response = await axios.get<UserUpgrade[]>(`${BASE_URL}/user`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default upgradeRoutes;
