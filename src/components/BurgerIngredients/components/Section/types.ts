import { EType, IIngredient } from "@/shared";

export interface ISectionProps {
  items: IIngredient[];
  title: string;
  sectionId: EType;
  sectionRef: (el: HTMLDivElement) => void;
}
