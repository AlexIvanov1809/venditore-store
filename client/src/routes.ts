import AdminItem from './pages/AdminProductItem/AdminItem';
import { Admin, Auth, Basket, Shop } from './pages';
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  ITEM_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE
} from './constants/routesConstants';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  { path: ITEM_ROUTE, Component: AdminItem }
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  }
];
