const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getUrls = async () => {
  const response = await fetch(`${API_URL}/urls`);
  return response.json();
};

export const getUrl = async (shortUrl: string) => {
  const response = await fetch(`${API_URL}/urls?shortUrl=${shortUrl}`);
  return response.json();
};

export const createUrl = async (url: string) => {
  const response = await fetch(`${API_URL}/urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ originalUrl: url }),
  });
  return response.json();
};

export const deleteUrl = async (id: string) => {
  const response = await fetch(`${API_URL}/urls/${id}`, {
    method: "DELETE",
  });
  return response.json();
};
