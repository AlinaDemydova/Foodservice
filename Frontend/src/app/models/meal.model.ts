export interface Meal {
  id: string;
  name: string;
  description: string;
  ingredientsList: string;
  weight: number;
  price: number;
  quantity?: number;
  totalItem?: number;
  imagePath?: string;
}
