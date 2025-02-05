import { FC } from "react";
import { ICardProps } from "./types.ts";
import styles from "./styles.module.css";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "clsx";

export const Card: FC<ICardProps> = ({
  price,
  name,
  image,
  onClick,
  counter,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
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
