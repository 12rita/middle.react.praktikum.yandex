import styles from "./styles.module.css";
import cn from "clsx";
import { OrdersFeed } from "@components/OrdersFeed";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services";
import { connect, disconnect } from "@/services/ducks/feed";
import { WebsocketStatus } from "@/services/ducks/ws";
import { useToaster } from "@components/Toaster";
import { FEED } from "@api";
import { Loader } from "@components/Loader";

export const Feed = () => {
  const {
    feed: { ordersFeed, error, status },
  } = useAppSelector((state) => ({
    feed: state.feed,
  }));

  const dispatch = useAppDispatch();
  const connectSocket = useCallback(
    () => dispatch(connect({ url: FEED })),
    [dispatch],
  );
  const disconnectSocket = useCallback(
    () => dispatch(disconnect()),
    [dispatch],
  );
  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  useEffect(() => {
    if (status === WebsocketStatus.OFFLINE) {
      connectSocket();
    }

    return () => {
      if (status === WebsocketStatus.ONLINE) disconnectSocket();
    };
  }, [status, connectSocket, disconnectSocket]);

  return (
    <div>
      <p className={cn("text", "text_type_main-large", styles.feedTitle)}>
        Лента заказов
      </p>

      <div className={styles.wrapper}>
        {status === WebsocketStatus.CONNECTING ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : (
          <OrdersFeed
            height={"calc(100vh - 88px - 40px - 20px - 40px)"}
            orders={ordersFeed.orders}
          />
        )}

        <div className={cn(styles.wrapper, styles.infoWrapper)}>
          <div className={styles.statusBar}>
            <div>
              <p className={cn("text", "text_type_main-medium", styles.title)}>
                Готовы:{" "}
              </p>
              <div className={styles.statusColumn}>
                {ordersFeed.orders
                  .filter((order) => order.status === "done")
                  .slice(0, 20)
                  .map((order) => (
                    <div
                      className={cn(
                        "text",
                        "text_type_digits-default",
                        styles.ready,
                      )}
                      key={`status-done-${order._id}`}
                    >
                      {order.number}
                    </div>
                  ))}
              </div>
            </div>{" "}
            <div>
              <p className={cn("text", "text_type_main-medium", styles.title)}>
                В работе:
              </p>
              <div className={styles.statusColumn}>
                {ordersFeed.orders
                  .filter((order) => order.status !== "done")
                  .slice(0, 20)
                  .map((order) => (
                    <div
                      key={`status-in-progress-${order._id}`}
                      className={cn("text", "text_type_digits-default")}
                    >
                      {order.number}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <p className={cn("text", "text_type_main-medium")}>
              Выполнено за все время:
            </p>
            <p className={cn("text", "text_type_digits-large", styles.stat)}>
              {ordersFeed.total}
            </p>
          </div>
          <div>
            <p className={cn("text", "text_type_main-medium")}>
              Выполнено за сегодня:
            </p>
            <p className={cn("text", "text_type_digits-large", styles.stat)}>
              {ordersFeed.totalToday}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
