import { EType, IIngredient } from "@/shared";

export interface IExtendedIngredient extends IIngredient {
  key: string;
}

export interface IActionPayload {
  item: IIngredient;
  sectionId: EType;
}

export interface IExtendedActionPayload extends IActionPayload {
  key: string;
  additionalKey: string;
}
