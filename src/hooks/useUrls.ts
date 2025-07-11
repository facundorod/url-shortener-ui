import { useState, useEffect } from "react";
import { getUrls } from "@/lib/services/urls.service";

export interface UrlData {
  id: number;
  shortUrl: string;
  originalUrl: string;
  createdBy: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  clicks: number;
}

export interface UseUrlsReturn {
  urls: UrlData[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUrls = (): UseUrlsReturn => {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrls = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getUrls();

      if (!response.ok && response.error) {
        throw new Error(response.error);
      }

      setUrls(response.data || response || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch URLs";
      setError(errorMessage);
      setUrls([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchUrls();
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  return {
    urls,
    isLoading,
    error,
    refetch,
  };
};
