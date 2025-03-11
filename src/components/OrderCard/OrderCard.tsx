import { FC } from "react";
import styles from "./styles.module.css";
import { IOrderContent } from "@/services/ducks/order";
import cn from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredient } from "@/shared";
import { Link, useLocation } from "react-router-dom";
import { PathsRoutes, ProfileRoutes } from "@/shared/routes.ts";

interface IOrderProps {
  order: IOrderContent;
  rawIngredients: IIngredient[];
}

const IMAGE_SHIFT = 48;
export const OrderCard: FC<IOrderProps> = ({ order, rawIngredients }) => {
  const { id, name, ingredients, price, timestamp } = order;
  const location = useLocation();
  const pathLink = location.pathname.includes("profile")
    ? PathsRoutes.PROFILE + ProfileRoutes.FEED
    : PathsRoutes.FEED;

  return (
    <Link key={id} to={`${pathLink}/${id}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.meta}>
          <p className={cn("text", "text_type_digits-default")}>#{id}</p>
          <p
            className={cn(
              "text",
              "text_type_main-default",
              "text_color_inactive",
            )}
          >
            {timestamp}
          </p>
        </div>
        <div className={cn("text", "text_type_main-medium")}>{name}</div>
        <div className={styles.meta}>
          <div className={styles.ingredientsContainer}>
            {ingredients.map((item, index) => {
              const ingredientData = rawIngredients.find(
                (ingredient) => ingredient._id === item,
              );
              if (!ingredientData) return null;
              const src = ingredientData.image;
              return (
                <div
                  className={styles.imageBorder}
                  key={id + "ingredient" + item + index}
                  style={{
                    left: index * IMAGE_SHIFT,
                    zIndex: ingredients.length - index,
                  }}
                >
                  <img
                    height={64}
                    width={64}
                    className={styles.image}
                    src={src}
                    alt={item}
                  />
                </div>
              );
            })}
          </div>

          <div className={cn("text", "text_type_main-default", styles.price)}>
            {price} <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
