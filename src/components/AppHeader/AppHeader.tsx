import styles from "./styles.module.css";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import { PathsRoutes } from "@/router";
import { HeaderTab } from "./HeaderTab.tsx";

export const AppHeader = () => {
  const tabs = [
    { id: PathsRoutes.CONSTRUCTOR, label: "Конструктор", icon: BurgerIcon },
    {
      id: PathsRoutes.ORDERS,
      label: "Лента заказов",
      icon: ListIcon,
    },
  ];
  return (
    <header className={styles.wrapper}>
      <div className={styles.mainTabs}>
        {tabs.map(({ id, icon, label }) => {
          return <HeaderTab key={id} id={id} label={label} Icon={icon} />;
        })}
      </div>
      <NavLink to={PathsRoutes.CONSTRUCTOR}>
        {" "}
        <Logo className={styles.logo} />{" "}
      </NavLink>
      <div className={styles.profile}>
        <HeaderTab
          id={PathsRoutes.PROFILE}
          label="Личный кабинет"
          Icon={ProfileIcon}
        />
      </div>
    </header>
  );
};
