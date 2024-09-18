import { API_URL } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  id: string;
}

const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        username: data.username,
        password: data.password,
      },
      {
        timeout: 5000,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => login(data),
  });
};
