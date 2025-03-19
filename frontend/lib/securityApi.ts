import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/security`;

interface SecuritySystem {
  id: string;
  name: string;
  level: number;
  price: number;
}

interface Vulnerability {
  id: string;
  description: string;
  severity: string;
}

interface SecurityLog {
  id: string;
  description: string;
  date: string;
}

const securityRoutes = {
  // Get all security systems
  getSecuritySystems: async () => {
    try {
      const response = await axios.get<SecuritySystem[]>(`${BASE_URL}/systems`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific security system by ID
  getSecuritySystem: async (id: string) => {
    try {
      const response = await axios.get<SecuritySystem>(
        `${BASE_URL}/systems/${id}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Purchase a security system
  purchaseSecuritySystem: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/systems/${id}/purchase`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upgrade a security system
  upgradeSecuritySystem: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/systems/${id}/upgrade`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user security systems
  getUserSecuritySystems: async () => {
    try {
      const response = await axios.get<SecuritySystem[]>(
        `${BASE_URL}/systems/user`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get all vulnerabilities
  getVulnerabilities: async () => {
    try {
      const response = await axios.get<Vulnerability[]>(
        `${BASE_URL}/vulnerabilities`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Fix a vulnerability
  fixVulnerability: async (id: string) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/vulnerabilities/${id}/fix`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Scan for vulnerabilities
  scanForVulnerabilities: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/scan`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get security logs
  getSecurityLogs: async () => {
    try {
      const response = await axios.get<SecurityLog[]>(`${BASE_URL}/logs`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Resolve a security log
  resolveSecurityLog: async (id: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/logs/${id}/resolve`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default securityRoutes;
