import { FC, useEffect } from "react";
import styles from "./styles.module.css";
import cn from "clsx";

import { TCategoryOrder } from "./types.ts";
import { useAppSelector } from "@/services";

import { useLocation } from "react-router-dom";
import { useToaster } from "@components/Toaster";

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

  const location = useLocation();

  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );

  const id = location.pathname.split("/").pop();
  const ingredient = rawIngredients.find((item) => item._id === id);

  if (!ingredient) return null;

  if (error) return null;

  const { image_large, name } = ingredient;
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
            <p>{ingredient[id]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
