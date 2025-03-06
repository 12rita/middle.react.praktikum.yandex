import { AppHeader } from "../AppHeader";
import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

interface ILayoutProps {
  children: ReactNode;
}
export const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <AppHeader />
      <div className={styles.wrapper}> {children}</div>
    </div>
  );
};
