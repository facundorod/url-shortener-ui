import { apiService } from "./api.service";
import { Url } from "../models/url.model";

export const getUrls = async () => {
  const response = await apiService.get<Url[]>(`/urls`);
  return response;
};

export const getUrl = async (shortUrl: string) => {
  const response = await apiService.get<Url>(`/urls?shortUrl=${shortUrl}`);
  return response;
};

export const createUrl = async (url: string) => {
  const response = await apiService.post<Partial<Url>>(`/urls`, {
    originalUrl: url,
  });
  return response;
};

export const deleteUrl = async (id: string) => {
  const response = await apiService.delete(`/urls/${id}`);
  return response;
};
