import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, RefObject, useEffect, useRef, useState } from "react";
import { Section } from "./components";
import styles from "./styles.module.css";
import { ITabs, TTitleRefs } from "./types.ts";

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
  const titleRefs = {} as TTitleRefs;
  tabs.forEach((tab) => {
    titleRefs[tab.id] = useRef<HTMLDivElement>(null);
  });

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
    if (!titleRefs[id]) return;
    (titleRefs[id] as RefObject<HTMLDivElement>).current?.scrollIntoView({
      behavior: "smooth",
    });
    setCurrent(id);
  };

  const handleScroll = () => {
    let min = Infinity;
    let closestTab = current;

    Object.entries(titleRefs).forEach(([key, value]) => {
      const title = (value as RefObject<HTMLDivElement>).current;
      if (title) {
        const offset = Math.abs(title.getBoundingClientRect().top - TOP_OFFSET);

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
            onClick={handleOpenModal}
            key={id}
            ref={titleRefs[id]}
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
