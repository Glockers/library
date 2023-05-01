import { ReactElement } from "react";

import { Login, NotFound, SignUp } from "../pages";

export enum EPermission {
  AUTH_NO_AUTH = "no_auth",
  AUTH_REQUIRED = "auth",
  AUTH_ADMIN = "auth_admin",
}

export enum EAppRoutes {
  HOME = "/",
  LOG_IN = "/login",
  SIGN_UP = "/sign-up",
}

export interface IRoute {
  element: ReactElement;
  permissions: Array<EPermission>;
}

export type TRoutes = Record<string, IRoute>;

export const routes: TRoutes = {
  [EAppRoutes.HOME]: {
    element: <Login />,
    permissions: [],
  },
  [EAppRoutes.LOG_IN]: {
    element: <Login />,
    permissions: [EPermission.AUTH_NO_AUTH],
  },
  [EAppRoutes.SIGN_UP]: {
    element: <SignUp />,
    permissions: [EPermission.AUTH_NO_AUTH],
  },
  "*": {
    element: <NotFound />,
    permissions: [],
  },
};
