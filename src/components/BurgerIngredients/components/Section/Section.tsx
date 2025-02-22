import { FC } from "react";
import { ISectionProps } from "./types.ts";
import styles from "./styles.module.css";
import cn from "clsx";
import { Card } from "../Card";

import { useAppSelector } from "@/services/ducks/store.ts";
import { Link, useLocation } from "react-router-dom";

export const Section: FC<ISectionProps> = ({
  items = [],
  title,
  sectionId,
  sectionRef,
}) => {
  const burger = useAppSelector((state) => state.burger);
  const location = useLocation();
  return (
    <>
      <div
        className={cn("text_type_main-medium", "text", styles.title)}
        id={"sectionTitle-" + sectionId}
        ref={(el) => !!el && sectionRef(el)}
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
            <Link
              key={_id}
              to={`/ingredients/${_id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <Card item={item} counter={counter} />
            </Link>
          );
        })}
      </div>
    </>
  );
};
