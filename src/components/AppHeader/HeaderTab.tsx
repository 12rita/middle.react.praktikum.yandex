import styles from "./styles.module.css";
import { FC } from "react";
import cn from "clsx";
import { NavLink } from "react-router-dom";

import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

interface IHeaderTabProps {
  id: string;
  label: string;
  Icon: FC<TIconProps>;
}

export const HeaderTab: FC<IHeaderTabProps> = ({ id, label, Icon }) => {
  return (
    <NavLink to={id} className={styles.tab}>
      {({ isActive }) => (
        <>
          {<Icon type={isActive ? "primary" : "secondary"} />}
          <p
            className={cn(
              "text",
              "text text_type_main-default",
              isActive ? "text_color_primary " : "text_color_inactive",
            )}
          >
            {label}
          </p>
        </>
      )}
    </NavLink>
  );
};
