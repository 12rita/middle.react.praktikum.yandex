import { FC } from "react";
import styles from "./styles.module.css";
import { IOrderContent } from "@/services/ducks/order";
import cn from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
interface IOrderProps {
  order: IOrderContent;
}

export const OrderCard: FC<IOrderProps> = ({ order }) => {
  const { id, name, ingredients, price, timestamp } = order;
  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <p className={cn("text", "text_type_digits-default")}>#{id}</p>
        <p
          className={cn(
            "text",
            "text_type_main-default",
            "text_color_inactive",
          )}
        >
          {timestamp}
        </p>
      </div>
      <div className={cn("text", "text_type_main-medium")}>{name}</div>
      <div className={styles.meta}>
        <div>{ingredients.join(", ")}</div>

        <p className={cn("text", "text_type_main-default")}>
          {price} <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};
