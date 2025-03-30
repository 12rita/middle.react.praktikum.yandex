export enum PathsRoutes {
  CONSTRUCTOR = "/",
  PROFILE = "/profile",
  FEED = "/feed",
  ORDER = "/feed/:id",
  LOGIN = "/login",
  REGISTER = "/register",
  FORGET_PASSWORD = "/forget-password",
  RESET_PASSWORD = "/reset-password",
  INGREDIENTS = "/ingredients/:id",
}

export enum ProfileRoutes {
  FEED = "/orders",
  ORDER = "/orders/:id",
}
