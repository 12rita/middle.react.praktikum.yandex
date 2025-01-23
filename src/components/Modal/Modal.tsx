import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

interface IModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
const modalRoot = document.getElementById("modals");
export const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
  const escHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  const handleOutsideClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target as HTMLElement).closest("#modal-body")) onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, [escHandler]);

  if (!modalRoot || !isOpen) return null;
  return createPortal(
    <div className={styles.overlay} onClick={handleOutsideClick}>
      <div className={styles.modal} id="modal-body">
        <CloseIcon type="primary" className={styles.close} onClick={onClose} />
        {children}
      </div>
    </div>,
    modalRoot,
  );
};
