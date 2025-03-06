import { orders } from "@pages/Orders/mock.ts";
import { OrderCard } from "@components/OrderCard";
import styles from "./styles.module.css";
import cn from "clsx";

export const Orders = () => {
  return (
    <div>
      <p className={cn("text", "text_type_main-large")}>Лента заказов</p>
      <div>
        <div className={styles.ordersFeed}>
          {orders.map((order) => (
            <OrderCard order={order} />
          ))}
        </div>
      </div>
      <div>Статус</div>
    </div>
  );
};
