import { IIngredients, TIngredientType } from "../../../../api";
import { Dispatch, SetStateAction } from "react";

export interface ISectionProps {
  items: IIngredients[];
  title: string;
  sectionId: TIngredientType;
  selected: IIngredients[];
  setSelected: Dispatch<SetStateAction<IIngredients[]>>;
}
