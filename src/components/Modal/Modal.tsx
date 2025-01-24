import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "@components/Modal/components";

interface IModalProps {
  children: ReactNode;
  onClose: () => void;
}
const modalRoot = document.getElementById("modals");

export const Modal: FC<IModalProps> = ({ onClose, children }) => {
  if (!modalRoot) return null;
  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal} id="modal-body">
        <CloseIcon type="primary" className={styles.close} onClick={onClose} />
        {children}
      </div>
    </ModalOverlay>,
    modalRoot,
  );
};
