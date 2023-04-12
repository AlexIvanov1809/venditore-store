import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '@/constants/consts';
import { useRootStore } from '@/context/StoreContext';
import styles from './Navbar.module.scss';

const Navbar = observer(() => {
  const { basket } = useRootStore();
  return (
    <header className={styles.header}>
      <NavLink to={SHOP_ROUTE}>Logo</NavLink>
      <nav className={styles.links}>
        <NavLink to={SHOP_ROUTE}>Shop</NavLink>
        <NavLink to={ADMIN_ROUTE}>Admin</NavLink>
        <NavLink to={LOGIN_ROUTE}>Login</NavLink>
        <div className={styles.basket}>
          <NavLink to={BASKET_ROUTE}>Basket</NavLink>
          {basket.order.length > 0 && <div className={styles.order_qty}>{basket.order.length}</div>}
        </div>
      </nav>
    </header>
  );
});

export default Navbar;
