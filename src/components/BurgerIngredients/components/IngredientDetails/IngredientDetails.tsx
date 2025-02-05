import { FC } from "react";
import styles from "./styles.module.css";
import cn from "clsx";
import { IIngredient } from "@api/getIngredients/types.ts";
import { TCategoryOrder } from "./types.ts";

const categoryOrder: TCategoryOrder[] = [
  { id: "calories", unit: "ккал", title: "Калории" },
  { id: "proteins", unit: "г", title: "Белки" },
  { id: "fat", unit: "г", title: "Жиры" },
  { id: "carbohydrates", unit: "г", title: "Углеводы" },
];

export const IngredientDetails: FC<{ item: IIngredient }> = ({ item }) => {
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
