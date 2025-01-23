import { IIngredient } from "../../api";
import { Dispatch, SetStateAction } from "react";

export interface IBurgerConstructorProps {
  selected: IIngredient[];
  setSelected: Dispatch<SetStateAction<IIngredient[]>>;
}
