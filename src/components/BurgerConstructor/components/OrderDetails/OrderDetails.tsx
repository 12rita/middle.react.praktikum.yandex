import { FC, useEffect } from "react";
import done from "../../../../assets/graphics.svg";
import styles from "./styles.module.css";
import cn from "clsx";
import { useAppSelector } from "@/services";
import { useToaster } from "@components/Toaster";
import { Loader } from "@components/Loader";

export const OrderDetails: FC = () => {
  const { loading, error, order } = useAppSelector((state) => state.order);

  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  return (
    <div className={styles.modal}>
      {loading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <>
          <p className={cn("text", "text_type_digits-large", "mb-8")}>
            {order.number}
          </p>
          <p className={cn("text", "text_type_main-medium")}>
            Идентификатор заказа
          </p>
          <img alt="done" src={done} className="m-15" />
          <p className={cn("text", "text_type_main-default", "mb-2")}>
            Ваш заказ начали готовить
          </p>
          <p
            className={cn(
              "text",
              "text_type_main-default",
              "text_color_inactive",
            )}
          >
            Дождитесь готовности на орбитальной станции
          </p>{" "}
        </>
      )}
    </div>
  );
};
