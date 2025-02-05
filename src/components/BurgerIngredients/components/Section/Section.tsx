import { FC } from "react";
import { ISectionProps } from "./types.ts";
import styles from "./styles.module.css";
import cn from "clsx";
import { Card } from "../Card";

import { useAppSelector } from "@/services/ducks/store.ts";

export const Section: FC<ISectionProps> = ({
  items = [],
  title,
  sectionId,
  onClick,
}) => {
  const burger = useAppSelector((state) => state.burger);

  return (
    <>
      <div
        className={cn("text_type_main-medium", "text", styles.title)}
        id={"sectionTitle-" + sectionId}
      >
        {title}
      </div>
      <div className={styles.section}>
        {items.map((item) => {
          const { _id, type } = item;
          let counter = burger.filter(
            (prevItem) => prevItem._id === _id,
          ).length;
          if (type === "bun") counter = counter / 2;
          return (
            <div key={_id}>
              <Card item={item} counter={counter} onClick={onClick} />
            </div>
          );
        })}
      </div>
    </>
  );
};
