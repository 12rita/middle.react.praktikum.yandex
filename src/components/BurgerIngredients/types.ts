import { EType } from "@/shared";
import { Ref } from "react";

export interface ITabs {
  id: EType;
  label: string;
}

export type TTitleRefs = {
  [key in EType]: Ref<HTMLDivElement>;
};
