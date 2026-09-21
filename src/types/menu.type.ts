export type CreateMealPayload = {
    categoryId: string;
    name: string;
    description?: string;
    price: number;
    image?: string;
    cuisine?: string;
    dietary?: string;
};