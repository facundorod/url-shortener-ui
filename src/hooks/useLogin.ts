import { useState } from "react";
import { login } from "@/lib/services/auth.service";
import { User } from "@/lib/models/user.model";

export interface LoginResult {
  user: Partial<User>;
  token?: string;
}

interface UseLoginReturn {
  loginUser: (email: string, password: string) => Promise<LoginResult | null>;
  isLoading: boolean;
  error: string | null;
  result: LoginResult | null;
  reset: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LoginResult | null>(null);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<LoginResult | null> => {
    // Reset previous state
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Validate inputs
      if (!email.trim()) {
        throw new Error("Email is required");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      if (!password.trim()) {
        throw new Error("Password is required");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const response = await login(email.trim(), password);

      if (!response) {
        throw new Error("Login failed. Please try again.");
      }

      const loginResult: LoginResult = {
        user: response,
        token: response.token,
      };

      setResult(loginResult);
      return loginResult;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials and try again.";

      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setError(null);
    setResult(null);
  };

  return {
    loginUser,
    isLoading,
    error,
    result,
    reset,
  };
};
