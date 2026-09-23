export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserStatusPayload {
  status: UserStatus;
}