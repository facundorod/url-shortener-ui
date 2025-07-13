import { apiService } from "./api.service";
import { User } from "../models/user.model";

export const login = async (email: string, password: string) => {
  const response = await apiService.post<Partial<User>>(`/auth/login`, {
    email,
    password,
  });
  return response;
};

export const register = async (user: Partial<User>) => {
  const response = await apiService.post<Partial<User>>(`/auth/register`, {
    ...user,
  });
  return response;
};
