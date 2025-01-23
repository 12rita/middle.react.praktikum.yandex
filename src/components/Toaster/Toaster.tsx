import { FC } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";
import { IToasterProps } from "./types.ts";

const toasterRoot = document.getElementById("toaster");
export const Toaster: FC<IToasterProps> = ({ error }) => {
  if (!error || !toasterRoot) return null;
  return createPortal(<div className={styles.toast}>{error}</div>, toasterRoot);
};
