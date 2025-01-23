import { FC } from "react";
import done from "../../../../assets/graphics.svg";
import styles from "./styles.module.css";
import cn from "clsx";

export const OrderDetails: FC = () => {
  const { data } = { data: { order_id: "034536" } };

  return (
    <div className={styles.modal}>
      <p className={cn("text", "text_type_digits-large", "mb-8")}>
        {data.order_id}
      </p>
      <p className={cn("text", "text_type_main-medium")}>
        Идентификатор заказа
      </p>
      <img alt="done" src={done} className="m-15" />
      <p className={cn("text", "text_type_main-default", "mb-2")}>
        Ваш заказ начали готовить
      </p>
      <p
        className={cn("text", "text_type_main-default", "text_color_inactive")}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};
