import { BasketStore, ErrorStore, ProductsStore, UserStore } from '@/store';
import React, { ReactNode, useContext } from 'react';

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
  return (
    <RootStoreContext.Provider
      value={{
        user: new UserStore(),
        products: new ProductsStore(),
        basket: new BasketStore(),
        adminErrors: new ErrorStore()
      }}
    >
      {children}
    </RootStoreContext.Provider>
  );
}

export default RootStoreProvider;
