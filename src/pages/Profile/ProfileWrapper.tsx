import { useAppDispatch } from "@/services";
import styles from "./styles.module.css";

import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import cn from "clsx";
import { PathsRoutes, ProfileRoutes } from "@/shared/routes.ts";
import { logout } from "@/services/ducks/user";
import { OrdersFeed } from "@components/OrdersFeed";
import { Profile } from "./Profile.tsx";
import { orders } from "./mock.ts";

export const ProfileWrapper = () => {
  const tabs = [
    { value: PathsRoutes.PROFILE, title: "Профиль", end: true },
    {
      value: PathsRoutes.PROFILE + ProfileRoutes.FEED,
      title: "История заказов",
    },
    { value: "", title: "Выход" },
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(
      logout({
        onSuccess: () => {
          navigate(PathsRoutes.LOGIN, { replace: true });
        },
      }),
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {tabs.map(({ value, title, end }) =>
          value ? (
            <NavLink to={value} key={title} end={end}>
              {({ isActive }) => (
                <p
                  className={cn(
                    "text",
                    "text text_type_main-medium",
                    isActive ? "text_color_primary " : "text_color_inactive",
                    styles.tab,
                  )}
                >
                  {title}
                </p>
              )}
            </NavLink>
          ) : (
            <div
              key={title}
              onClick={handleLogout}
              className={cn(
                "text",
                "text text_type_main-medium",
                "text_color_inactive",
                styles.logout,
                styles.tab,
              )}
            >
              {title}
            </div>
          ),
        )}
        <p
          className={cn(
            "text",
            "text text_type_main-small",
            "text_color_inactive",
            styles.info,
          )}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className="content">
        <Routes>
          <Route
            path={ProfileRoutes.FEED}
            element={
              <OrdersFeed
                height={"calc(100vh - 88px - 120px)"}
                orders={orders}
              />
            }
          />
          <Route path="/" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};
