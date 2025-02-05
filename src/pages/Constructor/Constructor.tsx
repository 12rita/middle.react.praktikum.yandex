import styles from "./styles.module.css";
import { BurgerIngredients } from "@components/BurgerIngredients";
import { BurgerConstructor } from "@components/BurgerConstructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Constructor = () => {
  return (
    <main className={styles.wrapper}>
      <DndProvider debugMode={true} backend={HTML5Backend}>
        <BurgerIngredients />

        <BurgerConstructor />
      </DndProvider>
    </main>
  );
};
