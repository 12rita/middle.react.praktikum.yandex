import { IIngredients } from "../../api";
import { Dispatch, SetStateAction } from "react";

export interface IBurgerConstructorProps {
  selected: IIngredients[];
  setSelected: Dispatch<SetStateAction<IIngredients[]>>;
}
