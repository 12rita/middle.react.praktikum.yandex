import { IIngredient, EType } from "@/shared";

export type TFilteredIngredients = {
  [key in EType]: IIngredient[];
};

export type IIngredientState = {
  loading: boolean;
  error: string;
  ingredients: TFilteredIngredients;
  rawIngredients: IIngredient[];
};

export interface IIngredientsResponse {
  data: IIngredient[];
  success: boolean;
}
