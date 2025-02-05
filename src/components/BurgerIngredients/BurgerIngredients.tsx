import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useEffect, useState } from "react";
import { Section } from "./components";
import styles from "./styles.module.css";
import { ITabs } from "./types.ts";

import { useAppDispatch, useAppSelector } from "@/services";

import { fetchIngredients } from "@/services/ducks/ingredients";
import { Loader } from "@components/Loader";
import { useToaster } from "@components/Toaster";
import { Modal } from "@components/Modal";
import { EType, IIngredient } from "@/shared";
import { modalSlice } from "@/services/ducks/modal";
import { IngredientDetails } from "@components/BurgerIngredients/components/IngredientDetails";

const tabs: ITabs[] = [
  { id: "bun", label: "Булки" },
  { id: "sauce", label: "Соусы" },
  { id: "main", label: "Начинки" },
];

const TOP_OFFSET = 88 + 56;

export const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState("bun");
  const {
    modal: { activeIngredient },
    ingredientsData: { loading, error, ingredients },
  } = useAppSelector((state) => ({
    ingredientsData: state.ingredients,
    modal: state.modal,
  }));

  const { openModal, closeModal } = modalSlice.actions;
  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const handleOpenModal = (item: IIngredient) => {
    dispatch(openModal(item));
  };

  const handleCloseIngredientDetails = () => {
    dispatch(closeModal());
  };

  const handleTabClick = (id: EType) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setCurrent(id);
  };

  const handleScroll = () => {
    const titles = document.querySelectorAll("[id^=sectionTitle]");
    let min = Infinity;
    let closestTab = current;
    titles.forEach((title) => {
      const offset = Math.abs(title.getBoundingClientRect().top - TOP_OFFSET);

      if (offset < min) {
        min = offset;
        closestTab = title.id.substring(13);
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
            onClick={handleOpenModal}
            key={id}
            items={ingredients[id]}
            title={label}
            sectionId={id}
          />
        ))}
      </div>
      {!!activeIngredient && (
        <Modal onClose={handleCloseIngredientDetails}>
          <IngredientDetails item={activeIngredient} />
        </Modal>
      )}
    </section>
  );
};
