import { API_URL } from "@/constants";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const logout = async (): Promise<void> => {
  try {
    await axios.post(
      `${API_URL}/logout`,
      {},
      {
        withCredentials: true,
        timeout: 5000,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => logout(),
  });
};
