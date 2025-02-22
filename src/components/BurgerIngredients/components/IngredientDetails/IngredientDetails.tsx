import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import cn from "clsx";

import { TCategoryOrder } from "./types.ts";
import { useAppDispatch, useAppSelector } from "@/services";
import { fetchIngredients } from "@/services/ducks/ingredients";
import { useLocation } from "react-router-dom";
import { useToaster } from "@components/Toaster";
import { IIngredient } from "@/shared";
import { Loader } from "@components/Loader";

const categoryOrder: TCategoryOrder[] = [
  { id: "calories", unit: "ккал", title: "Калории" },
  { id: "proteins", unit: "г", title: "Белки" },
  { id: "fat", unit: "г", title: "Жиры" },
  { id: "carbohydrates", unit: "г", title: "Углеводы" },
];

export const IngredientDetails: FC = () => {
  const {
    ingredientsData: { loading, error, rawIngredients },
  } = useAppSelector((state) => ({
    ingredientsData: state.ingredients,
  }));

  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  const [item, setItem] = useState({} as IIngredient);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!rawIngredients.length) {
      dispatch(fetchIngredients());
    } else {
      const id = location.pathname.split("/").pop();
      const ingredient = rawIngredients.find((item) => item._id === id);

      if (ingredient) setItem(ingredient);
    }
  }, [dispatch, location.pathname, rawIngredients]);

  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );

  if (error || (!loading && !item)) return null;

  const { image_large, name } = item;
  return (
    <div className={styles.modal}>
      <p className={cn("text", "text_type_main-large", styles.title)}>
        Детали ингредиента
      </p>

      <img alt={name} src={image_large} className="mb-4" />
      <p className={cn("text", "text_type_main-medium", "mb-8")}>{name}</p>
      <div
        className={cn(
          "text",
          "text_type_main-default",
          "text_color_inactive",
          styles.compound,
        )}
      >
        {categoryOrder.map(({ id, unit, title }) => (
          <div className={styles.category} key={id}>
            <p>{title + "," + unit}</p>
            <p>{item[id]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
