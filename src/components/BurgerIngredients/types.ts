import { Dispatch, SetStateAction } from "react";
import {
  IIngredient,
  TFilteredIngredients,
  TIngredientType,
} from "@api/getIngredients";

export interface ITabs {
  id: TIngredientType;
  label: string;
}

export interface IBurgerIngredientsProps {
  ingredients: TFilteredIngredients;
  selected: IIngredient[];
  setSelected: Dispatch<SetStateAction<IIngredient[]>>;
}
