import { useContext } from "react";
import { ToasterContext } from "./ToasterProvider.tsx";

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) throw new Error("Оберните компонент в ToasterProvider!");
  return context;
};
