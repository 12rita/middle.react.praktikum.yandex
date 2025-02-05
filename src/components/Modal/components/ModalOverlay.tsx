import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

import styles from "./styles.module.css";

interface IModalOverlayProps {
  children: ReactNode;
  onClose: () => void;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ children, onClose }) => {
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

  return (
    <div className={styles.overlay} onClick={handleOutsideClick}>
      {children}
    </div>
  );
};
