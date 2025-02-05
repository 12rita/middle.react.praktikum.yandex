import styles from "./styles.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { FC, useMemo, useState } from "react";
import { IBurgerConstructorProps } from "./types.ts";
import { Modal } from "../Modal";
import { OrderDetails } from "./components/OrderDetails";

export const BurgerConstructor: FC<IBurgerConstructorProps> = ({
  selected,
  setSelected,
}) => {
  const price = useMemo(() => {
    return selected.reduce((acc, item) => acc + item.price, 0);
  }, [selected]);
  const [isOpen, setOpen] = useState(false);

  const handleDelete = (idx: number) => {
    const newState = structuredClone(selected);
    newState.splice(idx, 1);
    setSelected(newState);
  };

  const handleManageOrder = () => {
    setOpen(true);
  };

  const handleCloseOrderDetails = () => {
    setOpen(false);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.list}>
        {selected.map((item, idx) => {
          const { name, price, type, image_mobile } = item;
          const isLocked = type === "bun";
          const listType =
            type === "bun" ? (idx === 0 ? "top" : "bottom") : undefined;
          const text =
            name +
            " " +
            (listType ? (listType === "top" ? "(верх)" : "(низ)") : "");
          return (
            <div className={styles.list_el}>
              {listType ? (
                <div className={styles.spacer} />
              ) : (
                <DragIcon type="primary" className={styles.dragIcon} />
              )}
              <ConstructorElement
                key={name + idx}
                text={text}
                thumbnail={image_mobile}
                price={price}
                isLocked={isLocked}
                type={listType}
                handleClose={() => {
                  handleDelete(idx);
                }}
              />
            </div>
          );
        })}
      </div>
      {!!selected.length && (
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
