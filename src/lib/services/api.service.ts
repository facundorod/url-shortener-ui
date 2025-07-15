const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

const getHeaders = (additionalHeaders?: Record<string, string>) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...additionalHeaders,
  };

  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
};

export const apiService = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      headers: getHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },
  post: async <T>(url: string, body: T): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },
  delete: async (url: string): Promise<void> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },
  put: async <T>(url: string, body: T): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }
    return response.json();
  },
};
