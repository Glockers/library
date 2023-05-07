import { ReactElement } from "react";

import {
  AdminOrders,
  AdminReports,
  Cart,
  CatalogManagment,
  Contacts,
  Home,
  Login,
  NotFound,
  Orders,
  Payments,
  Profile,
  SignUp,
} from "../pages";

export enum EPermission {
  AUTH_NO_AUTH = "no_auth",
  AUTH_REQUIRED = "auth",
  AUTH_ADMIN = "auth_admin",
}

export enum EAppRoutes {
  HOME = "/",
  PROFILE = "/profile",
  CART = "/cart",
  ORDERS = "/orders",
  MAP = "/map",
  AUTHOR = "/author/:authorId",
  LOG_IN = "/login",
  PAYMENTS = "/payments",
  SIGN_UP = "/sign-up",
  MANAGMENT_BOOK = "/manage-book",
  ADMIN_ORDERS = "/admin/orders",
  ADMIN_REPORTS = "/admin/reports",
}

export interface IRoute {
  element: ReactElement;
  permissions: Array<EPermission>;
}

export type TRoutes = Record<string, IRoute>;

export const routes: TRoutes = {
  [EAppRoutes.HOME]: {
    element: <Home />,
    permissions: [],
  },
  [EAppRoutes.MAP]: {
    element: <Contacts />,
    permissions: [],
  },
  [EAppRoutes.CART]: {
    element: <Cart />,
    permissions: [],
  },
  [EAppRoutes.ORDERS]: {
    element: <Orders />,
    permissions: [EPermission.AUTH_REQUIRED],
  },
  [EAppRoutes.PROFILE]: {
    element: <Profile />,
    permissions: [EPermission.AUTH_REQUIRED],
  },
  [EAppRoutes.PAYMENTS]: {
    element: <Payments />,
    permissions: [EPermission.AUTH_REQUIRED],
  },
  [EAppRoutes.LOG_IN]: {
    element: <Login />,
    permissions: [EPermission.AUTH_NO_AUTH],
  },
  [EAppRoutes.SIGN_UP]: {
    element: <SignUp />,
    permissions: [EPermission.AUTH_NO_AUTH],
  },
  [EAppRoutes.MANAGMENT_BOOK]: {
    element: <CatalogManagment />,
    permissions: [EPermission.AUTH_ADMIN, EPermission.AUTH_REQUIRED],
  },
  [EAppRoutes.ADMIN_ORDERS]: {
    element: <AdminOrders />,
    permissions: [EPermission.AUTH_ADMIN, EPermission.AUTH_REQUIRED],
  },
  [EAppRoutes.ADMIN_REPORTS]: {
    element: <AdminReports />,
    permissions: [EPermission.AUTH_ADMIN, EPermission.AUTH_REQUIRED],
  },
  "*": {
    element: <NotFound />,
    permissions: [],
  },
};
