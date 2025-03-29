import { Navigate, useLocation } from "react-router-dom";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/services";
import { profile } from "@/services/ducks/user";
import { PathsRoutes } from "@/shared/routes.ts";

import { Layout } from "@components/Layout";
import { Loader } from "@components/Loader";

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
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const from = location.state?.from || "/";

  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    await dispatch(profile());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (anonymous) {
      setLoading(false);
    }
    if (isAuthenticated && !anonymous) {
      setLoading(false);
    }
  }, [anonymous, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && !anonymous) {
      void init();
    }
  }, [anonymous, init, isAuthenticated]);

  if (anonymous === undefined) {
    return <Layout>{children}</Layout>;
  }
  if (loading) {
    return <Loader />;
  }

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated && !loading) {
    return <Navigate to={PathsRoutes.LOGIN} state={{ from: location }} />;
  }
  return <Layout>{children}</Layout>;
};
