import "./styles/main.scss";
import * as React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserStore, ProductStore, OrderStore } from "./store";

interface IRootStore {
  user: UserStore;
  products: ProductStore;
  basket: OrderStore;
}

export const Context = React.createContext<IRootStore>({} as IRootStore);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <Context.Provider
      value={{
        user: new UserStore(),
        products: new ProductStore(),
        basket: new OrderStore()
      }}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
