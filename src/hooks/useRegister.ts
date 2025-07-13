import { useState } from "react";
import { register } from "@/lib/services/auth.service";
import { User } from "@/lib/models/user.model";

export interface RegisterResult {
  user: Partial<User>;
  token?: string;
}

interface UseRegisterReturn {
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<RegisterResult | null>;
  isLoading: boolean;
  error: string | null;
  result: RegisterResult | null;
  reset: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RegisterResult | null>(null);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterResult | null> => {
    // Reset previous state
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Validate inputs
      if (!name.trim()) {
        throw new Error("Name is required");
      }

      if (name.trim().length < 2) {
        throw new Error("Name must be at least 2 characters");
      }

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

      const response = await register({
        name: name.trim(),
        email: email.trim(),
        password: password,
      });

      if (!response) {
        throw new Error("Registration failed. Please try again.");
      }

      const registerResult: RegisterResult = {
        user: response,
        token: response.token,
      };

      setResult(registerResult);
      return registerResult;
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";

      if (error instanceof Error) {
        // Handle specific error cases
        if (error.message.includes("400")) {
          errorMessage =
            "Invalid registration data. Please check your information.";
        } else if (
          error.message.includes("409") ||
          error.message.toLowerCase().includes("already exists")
        ) {
          errorMessage =
            "An account with this email already exists. Please use a different email.";
        } else if (error.message.includes("422")) {
          errorMessage = "Please check your input data and try again.";
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
    registerUser,
    isLoading,
    error,
    result,
    reset,
  };
};
