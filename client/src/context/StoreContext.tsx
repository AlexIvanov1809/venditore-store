import { BasketStore, ErrorStore, ProductsStore, UserStore } from '@/store';
import React, { ReactNode, useContext, useMemo } from 'react';

interface Props {
  children: ReactNode;
}

interface IRootStore {
  user: UserStore;
  products: ProductsStore;
  basket: BasketStore;
  adminErrors: ErrorStore;
}

const RootStoreContext = React.createContext<IRootStore>({} as IRootStore);

export function useRootStore() {
  return useContext(RootStoreContext);
}

function RootStoreProvider({ children }: Props) {
  const user = new UserStore();
  const products = new ProductsStore();
  const basket = new BasketStore();
  const adminErrors = new ErrorStore();

  const value = useMemo(() => ({ user, products, basket, adminErrors }), [user, products, basket, adminErrors]);

  return <RootStoreContext.Provider value={value}>{children}</RootStoreContext.Provider>;
}

export default RootStoreProvider;
