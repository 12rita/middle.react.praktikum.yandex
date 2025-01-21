import { BurgerIngredients, BurgerConstructor } from "../../components";
import styles from "./styles.module.css";
import { useState } from "react";
import { IIngredients, useGetIngredients } from "../../api";

export const Constructor = () => {
  const [selected, setSelected] = useState<IIngredients[]>([]);
  const { ingredients } = useGetIngredients();

  return (
    <main className={styles.wrapper}>
      <BurgerIngredients
        ingredients={ingredients}
        setSelected={setSelected}
        selected={selected}
      />
      <BurgerConstructor setSelected={setSelected} selected={selected} />
    </main>
  );
};
