import { FC, useEffect } from "react";
import styles from "./styles.module.css";
import cn from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { orders } from "./mock.ts";
import { useAppDispatch, useAppSelector } from "@/services";
import { useToaster } from "@components/Toaster";
import { fetchIngredients } from "@/services/ducks/ingredients";
import { Loader } from "@components/Loader";

export const OrderDetails: FC = () => {
  const id = location.pathname.split("/").pop();
  const order = orders.find((order) => order.id === id);
  const {
    ingredientsData: { loading, error, rawIngredients },
  } = useAppSelector((state) => ({
    ingredientsData: state.ingredients,
  }));

  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!rawIngredients.length) dispatch(fetchIngredients());
  }, [dispatch, rawIngredients]);

  if (loading) return <Loader />;
  if (!order) return null;

  const { name, ingredients, timestamp, price, status } = order;
  const statusName = status === "ready" ? "Выполнен" : "В работе";

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
          {ingredients.map((item) => {
            const ingredientData = rawIngredients.find(
              (ingredient) => ingredient._id === item,
            );
            if (!ingredientData) return null;
            const { image, name, price, type } = ingredientData;
            const quant = type === "bun" ? 2 : 1;
            return (
              <div className={styles.item}>
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
          {timestamp}
        </p>
        <div className={cn("text", "text_type_main-default", styles.price)}>
          {price} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
