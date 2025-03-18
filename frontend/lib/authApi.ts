import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export async function login(email: string, password: string) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export async function signup(
  username: string,
  email: string,
  password: string
) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/signup`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
}
