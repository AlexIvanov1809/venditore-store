import { FC, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import { check } from './http/userAPI';
import Loader from './components/ui/Loader/Loader';
import { getFromStorage } from './service/storage.service';
import NavBar from './components/header/Navbar/Navbar';
import { useRootStore } from './context/StoreContext';

const App: FC = observer(() => {
  const { user, basket } = useRootStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsInBasket = getFromStorage('venditore_basket');
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
