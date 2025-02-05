import { IIngredient } from "@/shared";

export interface ICardProps {
  item: IIngredient;
  onClick: (item: IIngredient) => void;
  counter?: number;
}
