import { API_URL } from "@/constants";
import axios from "axios";
import { useState } from "react";

const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  return response;
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      return await login(username, password);
    } catch (e) {
      setError("Wrong user name or password");
    } finally {
      setIsLoading(false);
    }
  };

  return { onLogin, isLoading, error };
};
