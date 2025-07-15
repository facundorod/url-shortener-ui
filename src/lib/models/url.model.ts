import { User } from "./user.model";

export interface Url {
  id: number;
  originalUrl: string;
  shortUrl: string;
  createdBy: User;
  createdAt: Date;
  expiresAt: Date;
}
