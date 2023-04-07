import { FC, useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AppRouter from "./components/AppRouter";
import { check } from "./http/userAPI";
import { Context } from "./main";
import Loader from "./components/ui/Loader/Loader";
import getFromStorage from "./service/storage.service";
import NavBar from "./components/header/Navbar/Navbar";

const App: FC = observer(() => {
  const { user, basket } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsInBasket = getFromStorage("venditore_basket");
    if (productsInBasket) {
      basket.setOrder(productsInBasket);
    }
    check()
      .then((data) => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch((e) => e)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
