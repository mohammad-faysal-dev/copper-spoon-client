export type CreateMealPayload = {
    categoryId: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    cuisine?: string;
    dietary?: string;
};
export interface Meal {
  id: string;
  providerId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image?: string | null;
  cuisine?: string | null;
  dietary?: string | null;
  isAvailable: boolean;
}

