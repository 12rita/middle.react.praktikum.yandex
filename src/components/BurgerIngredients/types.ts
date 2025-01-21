import { IIngredients, TFilteredIngredients, TIngredientType } from "../../api";
import { Dispatch, SetStateAction } from "react";

export interface ITabs {
  id: TIngredientType;
  label: string;
}

export interface IBurgerIngredientsProps {
  ingredients: TFilteredIngredients;
  selected: IIngredients[];
  setSelected: Dispatch<SetStateAction<IIngredients[]>>;
}
