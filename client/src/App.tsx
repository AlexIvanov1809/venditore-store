import { FC, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AppRouter from './components/AppRouter';
import authService from './http/userAPI';
import Loader from './components/ui/Loader/Loader';
import { getFromStorage } from './service/storage.service';
import NavBar from './components/header/Navbar/Navbar';
import { useRootStore } from './context/StoreContext';
import { BASKET_STORAGE_NAME } from './constants/configConstants';

const App: FC = observer(() => {
  const { user, basket } = useRootStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const productsInBasket = getFromStorage(BASKET_STORAGE_NAME);
    if (productsInBasket) {
      basket.setOrder(productsInBasket);
    }
    (async () => {
      try {
        const data = await authService.checkAuth();
        user.setUser(data);
      } catch (e: any) {
        if (e.message !== 'canceled') {
          console.log(e);
        }
      } finally {
        setLoading(false);
      }
    })();
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
