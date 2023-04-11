import { OrderStore, ProductStore, UserStore } from '@/store';
import React, { ReactNode, useContext } from 'react';

interface Props {
  children: ReactNode;
}

interface IRootStore {
  user: UserStore;
  products: ProductStore;
  basket: OrderStore;
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
        products: new ProductStore(),
        basket: new OrderStore()
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
};

export default RootStoreProvider;
