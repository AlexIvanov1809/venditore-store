import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { IProduct } from '@/types/productTypes';
import styles from './AdminItemForList.module.scss';

interface Props {
  product: IProduct;
}

const AdminItemForList = observer(({ product }: Props) => (
  <div data-active-product={!!product.active} className={styles.admin_item}>
    <NavLink className={styles.container} to={`/admin/product/${product.id}`}>
      <div>{product.type}</div>
      <div>{product.brand}</div>
      <div>{product.country}</div>
      <div>{product.sortName}</div>
      <div>{product.makingMethod}</div>
      <div>{product.manufacturingMethod}</div>
      <div>{product.teaType}</div>
    </NavLink>
  </div>
));

export default AdminItemForList;
