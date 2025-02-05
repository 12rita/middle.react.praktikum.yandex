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

export interface IIngredientsResponse {
  data: IIngredient[];
  success: boolean;
}
export type TIngredientType = "buns" | "mains" | "sauces";

export type TFilteredIngredients = {
  [key in TIngredientType]: IIngredient[];
};

export type TUseGetIngredientsResult = {
  ingredients: TFilteredIngredients;
  isLoading: boolean;
  isError: boolean;
  error: string;
};
