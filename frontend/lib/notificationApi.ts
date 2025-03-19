import axios from "axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`;

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
}

const notificationRoutes = {
  // Get all notifications
  getNotifications: async () => {
    try {
      const response = await axios.get<Notification[]>(`${BASE_URL}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get unread notifications
  getUnreadNotifications: async () => {
    try {
      const response = await axios.get<Notification[]>(`${BASE_URL}/unread`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get unread notification count
  getUnreadNotificationCount: async () => {
    try {
      const response = await axios.get<{ count: number }>(`${BASE_URL}/count`);
      return response.data.count;
    } catch (error) {
      throw error;
    }
  },

  // Mark a notification as read
  markNotificationAsRead: async (id: string) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}/read`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Mark all notifications as read
  markAllNotificationsAsRead: async () => {
    try {
      const response = await axios.put(`${BASE_URL}/read-all`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a notification
  deleteNotification: async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get notification settings
  getNotificationSettings: async () => {
    try {
      const response = await axios.get<NotificationSettings>(
        `${BASE_URL}/settings`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update notification settings
  updateNotificationSettings: async (settings: NotificationSettings) => {
    try {
      const response = await axios.put(`${BASE_URL}/settings`, settings);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default notificationRoutes;
