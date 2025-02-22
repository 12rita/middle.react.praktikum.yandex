import { RouteObject } from "react-router-dom";
import {
  Constructor,
  ForgetPassword,
  Login,
  Orders,
  Profile,
  Register,
  ResetPassword,
} from "@pages";
import { Layout } from "@components/Layout";
import { ProtectedRouteElement } from "@/router/ProtectedRouteElement.tsx";
import { Details } from "@pages/Details";
import { Page404 } from "@pages/404";

export enum PathsRoutes {
  CONSTRUCTOR = "/",
  PROFILE = "/profile",
  ORDERS = "/orders",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGET_PASSWORD = "/forget-password",
  RESET_PASSWORD = "/reset-password",
  INGREDIENTS = "/ingredients/:id",
  PROFILE_ORDERS = "/profile/orders",
  PROFILE_ORDER = "/profile/orders/:id",
}

export const routes: RouteObject[] = [
  {
    path: PathsRoutes.LOGIN,
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: PathsRoutes.INGREDIENTS,
    element: <Details />,
  },
  {
    path: PathsRoutes.FORGET_PASSWORD,
    element: (
      <Layout>
        <ForgetPassword />
      </Layout>
    ),
  },
  {
    path: PathsRoutes.RESET_PASSWORD,
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
  {
    path: PathsRoutes.REGISTER,
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
  {
    path: PathsRoutes.CONSTRUCTOR,
    element: (
      <Layout>
        <Constructor />
      </Layout>
    ),
  },
  {
    path: PathsRoutes.ORDERS,
    element: (
      <Layout>
        <Orders />
      </Layout>
    ),
  },
  {
    path: PathsRoutes.PROFILE,
    element: (
      <ProtectedRouteElement>
        <Layout>
          <Profile />
        </Layout>
      </ProtectedRouteElement>
    ),
  },
  {
    path: "*",
    element: (
      <Layout>
        {" "}
        <Page404 />
      </Layout>
    ),
  },
];
