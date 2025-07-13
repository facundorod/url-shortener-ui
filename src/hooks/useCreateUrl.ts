import { useState } from "react";
import { createUrl } from "@/lib/services/urls.service";

export interface CreateUrlResult {
  id: number;
  shortUrl: string;
  originalUrl: string;
  createdAt: string;
  expiresAt?: string;
}

interface UseCreateUrlReturn {
  createNewUrl: (url: string) => Promise<CreateUrlResult | null>;
  isLoading: boolean;
  error: string | null;
  result: CreateUrlResult | null;
  reset: () => void;
}

export const useCreateUrl = (): UseCreateUrlReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateUrlResult | null>(null);

  const createNewUrl = async (url: string): Promise<CreateUrlResult | null> => {
    // Reset previous state
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (!url.trim()) {
        throw new Error("URL cannot be empty");
      }

      try {
        new URL(url);
      } catch {
        throw new Error("Please enter a valid URL");
      }

      const response = await createUrl(url);

      if (!response.ok && response.error) {
        throw new Error(response.error);
      }

      const newUrl: CreateUrlResult = {
        id: response.id,
        shortUrl: response.shortUrl,
        originalUrl: response.originalUrl,
        createdAt: response.createdAt,
        expiresAt: response.expiresAt,
      };

      setResult(newUrl);
      return newUrl;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create URL";
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
    createNewUrl,
    isLoading,
    error,
    result,
    reset,
  };
};
