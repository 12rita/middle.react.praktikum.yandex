import { Navigate } from "react-router-dom";
import { ReactNode, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/services";
import { profile } from "@/services/ducks/user";
import { PathsRoutes } from "@/router/index.tsx";

export const ProtectedRouteElement = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { user } = useAppSelector((state) => ({
    user: state.user,
  }));

  const dispatch = useAppDispatch();

  const init = useCallback(async () => {
    await dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (!user.isAuthenticated) init();
  }, [init, user.isAuthenticated]);

  return user.isAuthenticated ? (
    children
  ) : (
    <Navigate to={PathsRoutes.LOGIN} replace />
  );
};
