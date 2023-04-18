import { Admin, Basket, Shop, AdminProductItem } from './pages';
import { ADMIN_ROUTE, BASKET_ROUTE, ITEM_ROUTE, SHOP_ROUTE } from './constants/routesConstants';

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  { path: ITEM_ROUTE, Component: AdminProductItem }
];

export const publicRoutes = [
  {
    path: SHOP_ROUTE,
    Component: Shop
  },
  {
    path: BASKET_ROUTE,
    Component: Basket
  }
];
