import { FC } from "react";
import { ISectionProps } from "./types.ts";
import styles from "./styles.module.css";
import cn from "clsx";
import { Card } from "../Card";
import { IIngredients } from "../../../../api";

export const Section: FC<ISectionProps> = ({
  items,
  title,
  sectionId,
  selected,
  setSelected,
}) => {
  const handleToggleIngredients = (item: IIngredients) => {
    const newState = structuredClone(selected);

    if (sectionId === "buns") {
      if (newState.length && newState[0].type === "bun") {
        if (newState[0]._id === item._id) {
          newState.shift();
          newState.pop();
        } else {
          newState.shift();
          newState.pop();
          newState.unshift(item);
          newState.push(item);
        }
      } else {
        newState.unshift(item);
        newState.push(item);
      }
    } else {
      if (newState[newState.length - 1].type === "bun")
        newState.splice(newState.length - 1, 0, item);
      else newState.push(item);
    }

    setSelected(newState);
  };

  return (
    <>
      <div
        className={cn("text_type_main-medium", "text", styles.title)}
        id={sectionId}
      >
        {title}
      </div>
      <div className={styles.section}>
        {items.map((item) => {
          const { name, _id, price, image, type } = item;
          let counter = selected.filter(
            (prevItem) => prevItem._id === _id,
          ).length;
          if (type === "bun") counter = counter / 2;
          return (
            <Card
              key={_id}
              name={name}
              price={price}
              image={image}
              counter={counter}
              onClick={() => {
                handleToggleIngredients(item);
              }}
            />
          );
        })}
      </div>
    </>
  );
};
