import { User } from "./user.model";

export interface Url {
  id: string;
  originalUrl: string;
  shortUrl: string;
  createdBy: User;
  createdAt: Date;
  expiresAt: Date;
}
