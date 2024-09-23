import { API_URL } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface SignupData {
  username: string;
  password: string;
}

export interface SignupResponse {
  username: string;
  id: string;
}

const signup = async (data: SignupData): Promise<SignupResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/signup`,
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

export const useSignup = () => {
  return useMutation({
    mutationFn: (data: SignupData) => signup(data),
  });
};
