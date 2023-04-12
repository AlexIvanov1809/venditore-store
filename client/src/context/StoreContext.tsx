import { BasketStore, ProductsStore, UserStore } from '@/store';
import React, { ReactNode, useContext } from 'react';

interface Props {
  children: ReactNode;
}

interface IRootStore {
  user: UserStore;
  products: ProductsStore;
  basket: BasketStore;
}

const RootStoreContext = React.createContext<IRootStore>({} as IRootStore);

export function useRootStore() {
  return useContext(RootStoreContext);
}

const RootStoreProvider = ({ children }: Props) => {
  return (
    <RootStoreContext.Provider
      value={{
        user: new UserStore(),
        products: new ProductsStore(),
        basket: new BasketStore()
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreProvider;
