import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { BurgerIngredients } from "@components/BurgerIngredients";
import { IIngredient, useGetIngredients } from "@api/getIngredients";
import { BurgerConstructor } from "@components/BurgerConstructor";
import { useToaster } from "@components/Toaster";
import { Loader } from "@components/Loader";

export const Constructor = () => {
  const [selected, setSelected] = useState<IIngredient[]>([]);
  const { ingredients, isLoading, isError, error } = useGetIngredients();
  const { setError } = useToaster();

  useEffect(() => {
    if (isError) setError(error);
  }, [error, isError, setError]);

  return (
    <main className={styles.wrapper}>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
        </div>
      ) : (
        <BurgerIngredients
          ingredients={ingredients}
          setSelected={setSelected}
          selected={selected}
        />
      )}
      <BurgerConstructor setSelected={setSelected} selected={selected} />
    </main>
  );
};
