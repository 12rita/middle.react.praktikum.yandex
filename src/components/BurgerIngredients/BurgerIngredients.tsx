import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useRef, useState } from "react";
import { Section } from "./components";
import styles from "./styles.module.css";
import { ITabs, TTitleRefs } from "./types.ts";

import { useAppDispatch, useAppSelector } from "@/services";

import { fetchIngredients } from "@/services/ducks/ingredients";
import { Loader } from "@components/Loader";
import { useToaster } from "@components/Toaster";
import { EType } from "@/shared";

const tabs: ITabs[] = [
  { id: "bun", label: "Булки" },
  { id: "sauce", label: "Соусы" },
  { id: "main", label: "Начинки" },
];

const TOP_OFFSET = 88 + 56;

export const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const titleRefs = useRef<TTitleRefs>({} as TTitleRefs);

  const {
    ingredientsData: { loading, error, ingredients },
  } = useAppSelector((state) => ({
    ingredientsData: state.ingredients,
  }));

  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleTabClick = (id: EType) => {
    if (!titleRefs.current[id]) return;
    titleRefs.current[id].scrollIntoView({
      behavior: "smooth",
    });
    setCurrent(id);
  };

  const handleAddRef = (id: EType) => (element: HTMLDivElement) => {
    titleRefs.current[id] = element;
  };

  const handleScroll = () => {
    let min = Infinity;
    let closestTab = current;

    Object.entries(titleRefs.current).forEach(([key, value]) => {
      if (value) {
        const offset = Math.abs(value.getBoundingClientRect().top - TOP_OFFSET);

        if (offset < min) {
          min = offset;
          closestTab = key;
        }
      }
    });

    if (closestTab !== current) setCurrent(closestTab);
  };

  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );

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
      <div className={styles.scrollable} onScroll={handleScroll}>
        {tabs.map(({ id, label }) => (
          <Section
            key={id}
            sectionRef={handleAddRef(id)}
            items={ingredients[id]}
            title={label}
            sectionId={id}
          />
        ))}
      </div>
    </section>
  );
};
