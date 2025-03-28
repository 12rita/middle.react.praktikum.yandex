import { FC, useCallback, useEffect } from "react";
import styles from "./styles.module.css";
import cn from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppDispatch, useAppSelector } from "@/services";
import { useToaster } from "@components/Toaster";
import { fetchIngredients } from "@/services/ducks/ingredients";
import { Loader } from "@components/Loader";
import { WebsocketStatus } from "@/services/ducks/ws";
import { FEED } from "@api";
import { connect, disconnect } from "@/services/ducks/feed";

export const OrderDetails: FC = () => {
  const id = location.pathname.split("/").pop();
  const {
    feed: { ordersFeed, error: feedError, status: feedStatus },
    ingredientsData: { loading, error, rawIngredients },
  } = useAppSelector((state) => ({
    feed: state.feed,
    ingredientsData: state.ingredients,
  }));

  const order = ordersFeed.orders.find(
    (order) => order.number.toString() === id,
  );

  const { setError } = useToaster();

  const dispatch = useAppDispatch();

  const connectSocket = useCallback(
    () => dispatch(connect({ url: FEED })),
    [dispatch],
  );
  const disconnectSocket = useCallback(
    () => dispatch(disconnect()),
    [dispatch],
  );

  useEffect(() => {
    if (error || feedError) setError(error ?? feedError);
  }, [error, feedError, setError]);

  useEffect(() => {
    if (!order && feedStatus === WebsocketStatus.OFFLINE) connectSocket();
    return () => {
      if (order && feedStatus === WebsocketStatus.ONLINE) disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!rawIngredients.length) dispatch(fetchIngredients());
  }, [dispatch, rawIngredients]);

  if (loading || feedStatus === WebsocketStatus.CONNECTING) return <Loader />;
  if (!order) return null;

  const { name, ingredients, createdAt, status } = order;
  const price = ingredients.reduce((acc, item) => {
    const ingredientPrice =
      rawIngredients.find((ingredient) => ingredient._id === item)?.price ?? 0;
    return acc + ingredientPrice;
  }, 0);
  const statusName = status === "done" ? "Выполнен" : "В работе";

  return (
    <div className={styles.order}>
      <p className={cn("text", "text_type_digits-default", styles.id)}>#{id}</p>
      <p className={cn("text", "text_type_main-medium", styles.name)}>{name}</p>
      <p className={cn("text", "text_type_main-default", styles.status)}>
        {statusName}
      </p>

      <div className={styles.content}>
        <p className={cn("text", "text_type_main-medium", styles.contentTitle)}>
          Состав:
        </p>

        <div className={styles.ingredientsContainer}>
          {ingredients.map((item, idx) => {
            const ingredientData = rawIngredients.find(
              (ingredient) => ingredient._id === item,
            );
            if (!ingredientData) return null;
            const { image, name, price, type } = ingredientData;
            const quant = type === "bun" ? 2 : 1;
            return (
              <div
                className={styles.item}
                key={`ingredien-${ingredientData._id}-${idx}`}
              >
                <div className={styles.imageBorder} key={item}>
                  <img
                    height={64}
                    width={64}
                    className={styles.image}
                    src={image}
                    alt={item}
                  />
                </div>
                <p>{name}</p>
                <div
                  className={cn("text", "text_type_main-default", styles.price)}
                >
                  {quant} x {price} <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.meta}>
        <p
          className={cn(
            "text",
            "text_type_main-default",
            "text_color_inactive",
          )}
        >
          {createdAt}
        </p>
        <div className={cn("text", "text_type_main-default", styles.price)}>
          {price} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
