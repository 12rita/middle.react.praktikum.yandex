import { FC, useRef } from "react";
import styles from "./styles.module.css";
import { useAppDispatch } from "@/services";

import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  IDragNDropProps,
  IListItemProps,
} from "@components/BurgerConstructor/components/ListItem/types.ts";
import { burgerSlice } from "@/services/ducks/burger";
import { useDrag, useDrop } from "react-dnd";

export const ListItem: FC<IListItemProps> = ({ item, idx }) => {
  const { name, price, type, image_mobile } = item;
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const { switchIngredients, deleteIngredient } = burgerSlice.actions;

  const [, dragRef] = useDrag({
    type: "burger",
    item: { id: item._id, idx },
  });

  const [, dropTarget] = useDrop({
    accept: "burger",
    hover(hoverItemId: IDragNDropProps) {
      if (hoverItemId.id === item._id) return;
      dispatch(switchIngredients({ prevIdx: hoverItemId.idx, newIdx: idx }));
    },
    drop(dropItemId: IDragNDropProps) {
      if (dropItemId.id === item._id) return;
      dispatch(switchIngredients({ prevIdx: dropItemId.idx, newIdx: idx }));
    },
  });

  const handleDelete = () => {
    dispatch(deleteIngredient(idx));
  };

  const isLocked = type === "bun";
  const listType = type === "bun" ? (idx === 0 ? "top" : "bottom") : undefined;
  const text =
    name + " " + (listType ? (listType === "top" ? "(верх)" : "(низ)") : "");

  dragRef(dropTarget(ref));

  return (
    <div className={styles.list_el} ref={ref}>
      {listType ? (
        <div className={styles.spacer} />
      ) : (
        <div>
          <DragIcon type="primary" className={styles.dragIcon} />
        </div>
      )}
      <ConstructorElement
        text={text}
        thumbnail={image_mobile}
        price={price}
        isLocked={isLocked}
        type={listType}
        handleClose={handleDelete}
      />
    </div>
  );
};
