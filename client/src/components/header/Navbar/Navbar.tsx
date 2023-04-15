import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE } from '@/constants/routesConstants';
import { useRootStore } from '@/context/StoreContext';
import styles from './Navbar.module.scss';
import Basket from '@/assets/icons/basket.svg';
import Logo from '@/assets/icons/logo.svg';
import User from '@/assets/icons/user.svg';
import Auth from '../Auth/Auth';
import { useState } from 'react';

const Navbar = observer(() => {
  const { basket, user } = useRootStore();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <header className={styles.header}>
      <NavLink className={styles.logo} to={SHOP_ROUTE}>
        <Logo />
      </NavLink>
      <nav className={styles.links}>
        <NavLink to={SHOP_ROUTE}>Магазин</NavLink>
        {user.isAuth && <NavLink to={ADMIN_ROUTE}>Панель Администратора</NavLink>}
        <button onClick={() => setIsOpen(!isOpen)}>{user.isAuth ? <User /> : 'Войти'}</button>
        <div className={styles.basket}>
          <NavLink to={BASKET_ROUTE}>
            <Basket />
          </NavLink>
          {basket.order.length > 0 && <div className={styles.order_qty}>{basket.order.length}</div>}
        </div>
      </nav>
      {isOpen && <Auth onOpen={setIsOpen} />}
    </header>
  );
});

export default Navbar;
