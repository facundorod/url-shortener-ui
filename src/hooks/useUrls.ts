import { useState, useEffect } from "react";
import { getUrls } from "@/lib/services/urls.service";
import { Url } from "@/lib/models/url.model";

export interface UseUrlsReturn {
  urls: Url[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useUrls = (enabled: boolean = true): UseUrlsReturn => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUrls = async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await getUrls();
      setUrls(response || []);
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
  }, [enabled]);

  return {
    urls,
    isLoading,
    error,
    refetch,
  };
};
