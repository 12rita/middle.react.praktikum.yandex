import { FC } from "react";
import { ICardProps } from "./types.ts";
import styles from "./styles.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "clsx";
import { useDrag } from "react-dnd";

export const Card: FC<ICardProps> = ({ item, counter }) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: item._id },
  });

  const { name, image, price } = item;

  return (
    <div className={styles.card} ref={dragRef}>
      {!!counter && <Counter count={counter} />}
      <img alt={name} src={image} />
      <div className={cn(styles.price, "text_type_digits-default", "text")}>
        {price}
        <CurrencyIcon type="primary" />
      </div>

      <div className={cn("text", "text_type_main-small")}>{name}</div>
    </div>
  );
};
