import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services";
import { profile } from "@/services/ducks/user";
import { PathsRoutes } from "@/shared/routes.ts";

import { Layout } from "@components/Layout";

export const ProtectedRouteElement = ({
  children,
  anonymous,
}: {
  children: ReactNode;
  anonymous?: boolean;
}) => {
  const {
    user: { isAuthenticated },
  } = useAppSelector((state) => ({
    user: state.user,
  }));
  const location = useLocation();
  const from = location.state?.from || "/";

  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    await dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated) init();
  }, [init, isAuthenticated]);

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (anonymous !== undefined && !anonymous && !isAuthenticated) {
    return <Navigate to={PathsRoutes.LOGIN} state={{ from: location }} />;
  }
  return <Layout>{children}</Layout>;
};
