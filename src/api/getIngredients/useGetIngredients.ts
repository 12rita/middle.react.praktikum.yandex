import { useEffect, useState } from "react";
import {
  IIngredients,
  IIngredientsResponse,
  TUseGetIngredientsResult,
} from "./types.ts";
import { api, INGREDIENTS } from "../index.ts";

export const useGetIngredients = (): TUseGetIngredientsResult => {
  const [ingredients, setIngredients] = useState<IIngredients[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchIngredients = async () => {
    const res = await api.get<IIngredientsResponse>(INGREDIENTS);
    setIngredients(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    void fetchIngredients();
  }, []);

  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const mains = ingredients.filter((item) => item.type === "main");

  return { ingredients: { buns, sauces, mains }, isLoading };
};
