import { FC } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import { IToasterProps } from "./types.ts";

const toasterRoot = document.getElementById("toaster");
export const Toaster: FC<IToasterProps> = ({ errors }) => {
  if (!errors.length || !toasterRoot) return null;
  return createPortal(
    <div>
      {errors.map((error) => (
        <div className={styles.toast} key={error + Math.random()}>
          {error}
        </div>
      ))}
    </div>,
    toasterRoot,
  );
};
