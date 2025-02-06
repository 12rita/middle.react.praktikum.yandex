import styles from "./styles.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo, useState } from "react";
import { Modal } from "../Modal";
import { OrderDetails } from "./components/OrderDetails";
import { useAppDispatch, useAppSelector } from "@/services/ducks/store.ts";
import { burgerSlice } from "@/services/ducks/burger";
import { postOrderNumber } from "@/services/ducks/order";
import { useDrop } from "react-dnd";
import { ListItem } from "@components/BurgerConstructor/components/ListItem";

export const BurgerConstructor: FC = () => {
  const [isOpen, setOpen] = useState(false);

  const {
    burger,
    ingredientsData: { rawIngredients },
  } = useAppSelector((state) => ({
    burger: state.burger,
    ingredientsData: state.ingredients,
  }));

  const dispatch = useAppDispatch();
  const { addIngredient } = burgerSlice.actions;

  const price = useMemo(() => {
    return burger.reduce((acc, item) => acc + item.price, 0);
  }, [burger]);

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId: { id: string }) {
      const ingredient = rawIngredients.find((item) => item._id === itemId.id);
      if (ingredient)
        dispatch(
          addIngredient({
            item: ingredient,
            sectionId: ingredient.type,
          }),
        );
    },
  });

  const handleManageOrder = () => {
    const ingredients = burger.map((item) => item._id);
    ingredients.pop();
    dispatch(postOrderNumber(ingredients));
    setOpen(true);
  };

  const handleCloseOrderDetails = () => {
    setOpen(false);
  };

  return (
    <section className={styles.wrapper} ref={dropTarget}>
      <div className={styles.list}>
        {burger.map((item, idx) => {
          return <ListItem key={item.key} item={item} idx={idx} />;
        })}
      </div>
      {!!burger.length && (
        <div className={styles.order}>
          <p className={"text text_type_main-large"}>{price}</p>
          <CurrencyIcon className={styles.icon} type="primary" />
          <Button htmlType="button" size="large" onClick={handleManageOrder}>
            Оформить заказ
          </Button>
        </div>
      )}
      {isOpen && (
        <Modal onClose={handleCloseOrderDetails}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};
