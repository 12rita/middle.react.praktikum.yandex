import { EType } from "@/shared";

export interface ITabs {
  id: EType;
  label: string;
}

export type TTitleRefs = {
  [key in EType]: HTMLDivElement;
};
