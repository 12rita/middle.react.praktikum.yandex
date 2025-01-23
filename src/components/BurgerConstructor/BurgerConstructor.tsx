import styles from "./styles.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { FC, useMemo, useState } from "react";
import { IBurgerConstructorProps } from "./types.ts";
import { Modal } from "../Modal";
import { OrderDetails } from "./components/OrderDetails";
import { IngredientDetails } from "@components/BurgerConstructor/components/IngredientDetails";
import { IIngredient } from "@api/getIngredients";
export const BurgerConstructor: FC<IBurgerConstructorProps> = ({
  selected,
  setSelected,
}) => {
  const price = useMemo(() => {
    return selected.reduce((acc, item) => acc + item.price, 0);
  }, [selected]);
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IIngredient>(
    {} as IIngredient,
  );

  const handleOpenModal = (item: IIngredient) => {
    setSelectedItem(item);
  };

  const handleCloseIngredientDetails = () => {
    setSelectedItem({} as IIngredient);
  };

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
          return (
            <div
              onClick={() => {
                handleOpenModal(item);
              }}
            >
              <ConstructorElement
                key={name + idx}
                text={name}
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
      <Modal isOpen={isOpen} onClose={handleCloseOrderDetails}>
        <OrderDetails />
      </Modal>
      <Modal
        isOpen={!!Object.keys(selectedItem).length}
        onClose={handleCloseIngredientDetails}
      >
        <IngredientDetails item={selectedItem} />
      </Modal>
    </section>
  );
};
