export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: Date;
  token?: string;
  updatedAt: Date;
}
