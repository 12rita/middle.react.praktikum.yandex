export type EType = "sauce" | "bun" | "main";

export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: EType;
  __v: number;
  _id: string;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IInitialState {
  loading: boolean;
  error: string;
}

export interface IOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}
