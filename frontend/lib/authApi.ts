import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/auth`;

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

const authRoutes = {
  // Register user
  register: async (data: RegisterRequest) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (data: LoginRequest) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${BASE_URL}/login`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user (protected route)
  logout: async () => {
    try {
      const response = await axios.post(`${BASE_URL}/logout`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, {
        email,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Verify reset code
  verifyResetCode: async (code: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/verify-reset-code`, {
        code,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password
  resetPassword: async (newPassword: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/reset-password`, {
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get user sessions (protected route)
  getSessions: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sessions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Revoke user session (protected route)
  revokeSession: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/sessions/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authRoutes;
