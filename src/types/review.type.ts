export interface Review {
  id: string;
  customerId: string;
  mealId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewPayload {
  mealId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewPayload {
  rating?: number;
  comment?: string;
}