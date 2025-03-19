import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/missions`; 

interface Mission {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate?: string;
  endDate?: string;
}

const missionRoutes = {
  // Get all missions
  getMissions: async () => {
    try {
      const response = await axios.get<Mission[]>(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific mission by ID
  getMission: async (id: string) => {
    try {
      const response = await axios.get<Mission>(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Start a mission by ID
  startMission: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/${id}/start`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Complete a mission by ID
  completeMission: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/${id}/complete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Abort a mission by ID
  abortMission: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/${id}/abort`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get mission history
  getMissionHistory: async () => {
    try {
      const response = await axios.get<Mission[]>(`${BASE_URL}/history`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get active mission
  getActiveMission: async () => {
    try {
      const response = await axios.get<Mission>(`${BASE_URL}/active`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default missionRoutes;
