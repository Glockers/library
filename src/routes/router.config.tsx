import { ReactElement } from "react";

import { Home, Login, NotFound, Profile, SignUp, Contacts, Payments, Cart, Orders } from "../pages";
import { AdminOrders, CatalogManagment } from "../pages/Admin";

export enum EPermission {
  AUTH_NO_AUTH = "no_auth",
  AUTH_REQUIRED = "auth",
  AUTH_ADMIN = "auth_admin",
}

export enum EAppRoutes {
  HOME = "/",
  PROFILE = "/profile",
  CART = '/cart',
  ORDERS = '/orders',
  MAP = '/map',
  AUTHOR = '/author/:authorId',
  LOG_IN = "/login",
  PAYMENTS = "/payments",
  SIGN_UP = "/sign-up",
  MANAGMENT_BOOK = "/manage-book",
  ADMIN_ORDERS = "/admin/orders"
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
    permissions: [EPermission.AUTH_ADMIN],
  },
  [EAppRoutes.ADMIN_ORDERS]: {
    element: <AdminOrders />,
    permissions: [EPermission.AUTH_ADMIN],
  },
  "*": {
    element: <NotFound />,
    permissions: [],
  },
};
