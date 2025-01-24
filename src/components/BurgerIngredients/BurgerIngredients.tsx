import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useState } from "react";
import { Section } from "./components";
import styles from "./styles.module.css";
import { IBurgerIngredientsProps, ITabs } from "./types.ts";
import { IIngredient, TIngredientType } from "@api/getIngredients";
import { Modal } from "@components/Modal";
import { IngredientDetails } from "@components/BurgerIngredients/components/IngredientDetails";

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
  const [selectedItem, setSelectedItem] = useState<IIngredient>(
    {} as IIngredient,
  );
  const handleTabClick = (id: TIngredientType) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCurrent(id);
  };
  const handleOpenModal = (item: IIngredient) => {
    setSelectedItem(item);
  };

  const handleCloseIngredientDetails = () => {
    setSelectedItem({} as IIngredient);
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
            onClick={handleOpenModal}
            key={id}
            items={ingredients[id]}
            title={label}
            sectionId={id}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </div>
      {!!Object.keys(selectedItem).length && (
        <Modal onClose={handleCloseIngredientDetails}>
          <IngredientDetails item={selectedItem} />
        </Modal>
      )}
    </section>
  );
};
