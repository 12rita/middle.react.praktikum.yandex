import { IngredientDetails } from "@components/BurgerIngredients";
import styles from "./styles.module.css";
import { Modal } from "@components/Modal";
import { useLocation, useNavigate } from "react-router-dom";

export const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };
  return background ? (
    <Modal onClose={handleModalClose}>
      <IngredientDetails />
    </Modal>
  ) : (
    <div className={styles.wrapper}>
      <IngredientDetails />
    </div>
  );
};
