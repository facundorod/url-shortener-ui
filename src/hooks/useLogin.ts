import { useState } from "react";
import { login } from "@/lib/services/auth.service";
import { User } from "@/lib/models/user.model";
import { useAuth } from "../contexts/AuthContext";

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
  const { login: authLogin } = useAuth();
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

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const response = await login(email.trim(), password);

      if (!response) {
        throw new Error("Login failed. Please try again.");
      }

      const loginResult: LoginResult = {
        user: response,
        token: response.token,
      };

      if (response.token) {
        authLogin(response.token, {
          id: response.id?.toString() || "unknown",
          email: response.email || email,
          name: response.name || "User",
        });
      } else {
        console.log("No token in response");
      }

      setResult(loginResult);
      return loginResult;
    } catch (error) {
      let errorMessage =
        "Login failed. Please check your credentials and try again.";

      if (error instanceof Error) {
        // Handle specific error cases
        if (
          error.message.includes("401") ||
          error.message.toLowerCase().includes("unauthorized")
        ) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.message.includes("400")) {
          errorMessage = "Invalid login data. Please check your information.";
        } else if (error.message.includes("403")) {
          errorMessage = "Account access denied. Please contact support.";
        } else if (error.message.includes("404")) {
          errorMessage =
            "Account not found. Please check your email or sign up.";
        } else if (error.message.includes("500")) {
          errorMessage = "Server error. Please try again later.";
        } else if (
          error.message.toLowerCase().includes("network") ||
          error.message.toLowerCase().includes("fetch")
        ) {
          errorMessage =
            "Network error. Please check your connection and try again.";
        } else if (error.message.trim()) {
          // Use the actual error message from the server if available
          errorMessage = error.message;
        }
      }

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
