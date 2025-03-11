import { orders, stats } from "@pages/Feed/mock.ts";
import styles from "./styles.module.css";
import cn from "clsx";
import { OrdersFeed } from "@components/OrdersFeed";

export const Feed = () => {
  return (
    <div>
      <p className={cn("text", "text_type_main-large", styles.feedTitle)}>
        Лента заказов
      </p>

      <div className={styles.wrapper}>
        <OrdersFeed
          height={"calc(100vh - 88px - 40px - 20px - 40px)"}
          orders={orders}
        />

        <div className={cn(styles.wrapper, styles.infoWrapper)}>
          <div className={styles.statusBar}>
            <div>
              <p className={cn("text", "text_type_main-medium", styles.title)}>
                Готовы:{" "}
              </p>
              {orders
                .filter((order) => order.status === "ready")
                .map((order) => (
                  <div
                    className={cn(
                      "text",
                      "text_type_digits-default",
                      styles.ready,
                    )}
                  >
                    {order.id}
                  </div>
                ))}
            </div>{" "}
            <div>
              <p className={cn("text", "text_type_main-medium", styles.title)}>
                В работе:
              </p>{" "}
              {orders
                .filter((order) => order.status === "in progress")
                .map((order) => (
                  <div className={cn("text", "text_type_digits-default")}>
                    {order.id}
                  </div>
                ))}
            </div>
          </div>
          <div>
            <p className={cn("text", "text_type_main-medium")}>
              Выполнено за все время:
            </p>
            <p className={cn("text", "text_type_digits-large", styles.stat)}>
              {stats.all_time}
            </p>
          </div>
          <div>
            <p className={cn("text", "text_type_main-medium")}>
              Выполнено за сегодня:
            </p>
            <p className={cn("text", "text_type_digits-large", styles.stat)}>
              {stats.today}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
