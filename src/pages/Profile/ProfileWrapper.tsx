import { useAppDispatch, useAppSelector } from "@/services";
import styles from "./styles.module.css";

import {
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import cn from "clsx";
import { PathsRoutes, ProfileRoutes } from "@/shared/routes.ts";
import { logout } from "@/services/ducks/user";
import { OrdersFeed } from "@components/OrdersFeed";
import { Profile } from "./Profile.tsx";

import { useToaster } from "@components/Toaster";
import { useCallback, useEffect, useState } from "react";
import { WebsocketStatus } from "@/services/ducks/ws";
import { connect, disconnect } from "@/services/ducks/feed";
import { USER_FEED } from "@api";
import { Loader } from "@components/Loader";

const tabs = [
  { value: PathsRoutes.PROFILE, title: "Профиль", end: true },
  {
    value: PathsRoutes.PROFILE + ProfileRoutes.FEED,
    title: "История заказов",
  },
  { value: "", title: "Выход" },
];

export const ProfileWrapper = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isOrderTab = location.pathname.includes("orders");

  const {
    feed: { ordersFeed, error, status },
    user: { isAuthenticated },
  } = useAppSelector((state) => ({
    feed: state.feed,
    user: state.user,
  }));
  const [isConnected, setIsConnected] = useState(false);
  const connectSocket = useCallback(
    () => dispatch(connect({ url: USER_FEED, withToken: true })),
    [dispatch],
  );
  const disconnectSocket = useCallback(
    () => dispatch(disconnect()),
    [dispatch],
  );
  const { setError } = useToaster();

  useEffect(() => {
    if (error) setError(error);
  }, [error, setError]);

  useEffect(() => {
    if (status === WebsocketStatus.ERROR || !isAuthenticated) return;
    if (status === WebsocketStatus.OFFLINE && isOrderTab && !isConnected) {
      connectSocket();
      setIsConnected(true);
    }

    return () => {
      if (status === WebsocketStatus.ONLINE) {
        disconnectSocket();
        setIsConnected(false);
      }
    };
  }, [
    connectSocket,
    disconnectSocket,
    isAuthenticated,
    isConnected,
    isOrderTab,
    status,
  ]);

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
      <div className={styles.content}>
        <Routes>
          <Route
            path={ProfileRoutes.FEED}
            element={
              status === WebsocketStatus.CONNECTING ? (
                <Loader />
              ) : (
                <OrdersFeed
                  height={"calc(100vh - 88px - 120px)"}
                  orders={ordersFeed.orders}
                />
              )
            }
          />

          <Route path="/" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};
