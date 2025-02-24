import { IIngredient, EType, IInitialState } from "@/shared";

export type TFilteredIngredients = {
  [key in EType]: IIngredient[];
};

export type IIngredientState = {
  ingredients: TFilteredIngredients;
  rawIngredients: IIngredient[];
} & IInitialState;

export interface IIngredientsResponse {
  data: IIngredient[];
  success: boolean;
}
