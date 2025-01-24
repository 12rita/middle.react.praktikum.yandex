import { Dispatch, SetStateAction } from "react";
import { IIngredient, TIngredientType } from "@api/getIngredients";

export interface ISectionProps {
  items: IIngredient[];
  title: string;
  sectionId: TIngredientType;
  selected: IIngredient[];
  setSelected: Dispatch<SetStateAction<IIngredient[]>>;
  onClick: (item: IIngredient) => void;
}
