import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import { Section } from "./components";
import styles from "./styles.module.css";
import { IBurgerIngredientsProps, ITabs } from "./types.ts";
import { TIngredientType } from "@api/getIngredients";

const tabs: ITabs[] = [
  { id: "buns", label: "Булки" },
  { id: "sauces", label: "Соусы" },
  { id: "mains", label: "Начинки" },
];

export const BurgerIngredients: FC<IBurgerIngredientsProps> = ({
  ingredients,
  selected,
  setSelected,
}) => {
  const [current, setCurrent] = useState("buns");

  const handleTabClick = (id: TIngredientType) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCurrent(id);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.tabs}>
        {tabs.map(({ id, label }) => (
          <Tab
            key={id}
            value={id}
            active={current === id}
            onClick={() => {
              handleTabClick(id);
            }}
          >
            {label}
          </Tab>
        ))}
      </div>
      <div className={styles.scrollable}>
        {tabs.map(({ id, label }) => (
          <Section
            key={id}
            items={ingredients[id]}
            title={label}
            sectionId={id}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
    </section>
  );
};
