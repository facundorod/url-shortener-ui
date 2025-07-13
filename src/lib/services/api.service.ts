const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiService = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`);
    return response.json();
  },
  post: async <T>(url: string, body: T): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },
  delete: async (url: string): Promise<void> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
    });
    return response.json();
  },
  put: async <T>(url: string, body: T): Promise<T> => {
    const response = await fetch(`${API_URL}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return response.json();
  },
};
