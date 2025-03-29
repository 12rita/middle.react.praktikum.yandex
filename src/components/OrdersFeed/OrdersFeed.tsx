import { FC, useEffect } from "react";
import styles from "./styles.module.css";
import { useAppSelector } from "@/services";
import { useToaster } from "@components/Toaster";

import { Loader } from "@components/Loader";
import { OrderCard } from "@components/OrderCard";
import { IOrder } from "@/shared";

interface IOrdersFeedProps {
  orders: IOrder[];
  height?: string;
}

export const OrdersFeed: FC<IOrdersFeedProps> = ({ orders, height }) => {
  const {
    ingredientsData: { loading, error, rawIngredients },
  } = useAppSelector((state) => ({
    ingredientsData: state.ingredients,
  }));

  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  if (loading) return <Loader />;

  return (
    <div className={styles.ordersFeed} style={{ maxHeight: height }}>
      {orders.map((order) => (
        <OrderCard
          order={order}
          key={"order" + order._id}
          rawIngredients={rawIngredients}
        />
      ))}
    </div>
  );
};
