import styles from "./styles.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { FC, useMemo } from "react";
import { IBurgerConstructorProps } from "./types.ts";

export const BurgerConstructor: FC<IBurgerConstructorProps> = ({
  selected,
  setSelected,
}) => {
  const price = useMemo(() => {
    return selected.reduce((acc, item) => acc + item.price, 0);
  }, [selected]);

  const handleDelete = (idx: number) => {
    const newState = structuredClone(selected);
    newState.splice(idx, 1);
    setSelected(newState);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.list}>
        {selected.map(({ name, price, type, image_mobile }, idx) => {
          const isLocked = type === "bun";
          const listType =
            type === "bun" ? (idx === 0 ? "top" : "bottom") : undefined;
          return (
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
          );
        })}
      </div>
      {!!selected.length && (
        <div className={styles.order}>
          <p className={"text text_type_main-large"}>{price}</p>
          <CurrencyIcon className={styles.icon} type="primary" />
          <Button htmlType="button" size="large">
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};
