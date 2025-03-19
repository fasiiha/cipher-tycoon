import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/pvp`;

interface PvPTarget {
  id: string;
  name: string;
  level: number;
}

interface PvPAttack {
  id: string;
  attacker: string;
  defender: string;
  result: string;
  date: string;
}

interface PvPDefense {
  id: string;
  defender: string;
  attacker: string;
  result: string;
  date: string;
}

const pvpRoutes = {
  // Get PvP targets
  getPvPTargets: async () => {
    try {
      const response = await axios.get<PvPTarget[]>(`${BASE_URL}/targets`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Attack a player
  attackPlayer: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/attack/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get PvP attack history
  getPvPAttackHistory: async () => {
    try {
      const response = await axios.get<PvPAttack[]>(`${BASE_URL}/attacks`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get PvP defense history
  getPvPDefenseHistory: async () => {
    try {
      const response = await axios.get<PvPDefense[]>(`${BASE_URL}/defenses`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get attack cooldown
  getAttackCooldown: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cooldown`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default pvpRoutes;
