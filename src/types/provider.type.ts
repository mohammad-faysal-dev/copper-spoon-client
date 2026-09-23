export interface Provider {
  id: string;
  userId: string;
  restaurantName: string;
  description?: string | null;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
}

export interface CreateProviderProfilePayload {
  restaurantName: string;
  description?: string;
  phone?: string;
  address?: string;
  image?: string;
}
