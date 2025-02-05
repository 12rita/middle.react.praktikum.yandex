import { IIngredient } from "@/shared";

export interface IListItemProps {
  item: IIngredient;
  idx: number;
}

export interface IDragNDropProps {
  id: string;
  idx: number;
}
