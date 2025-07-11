// Remove the dotenv import and config - these are Node.js specific
// In Next.js, client-side environment variables must be prefixed with NEXT_PUBLIC_
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getUrls = async () => {
  const response = await fetch(`${API_URL}/urls`);
  return response.json();
};

export const createUrl = async (url: string) => {
  const response = await fetch(`${API_URL}/urls`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url }),
  });
  return response.json();
};
