export type EType = "sauce" | "bun" | "main";

export interface IIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: EType;
  __v: number;
  _id: string;
}
