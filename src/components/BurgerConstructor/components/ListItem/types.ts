import { IExtendedIngredient } from "@/services/ducks/burger";

export interface IListItemProps {
  item: IExtendedIngredient;
  idx: number;
}

export interface IDragNDropProps {
  id: string;
  idx: number;
}
