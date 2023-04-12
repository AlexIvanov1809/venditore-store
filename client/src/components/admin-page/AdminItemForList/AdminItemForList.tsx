import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import { IProduct } from '@/types/productTypes';
import styles from './AdminItemForList.module.css';

interface Props {
  product: IProduct;
}

const AdminItemForList = observer(({ product }: Props) => (
  <div className={styles.admin_item}>
    <NavLink to={`/admin/product/${product.id}`}>
      <div>{product.type}</div>
      <div>{product.brand}</div>
      <div>{product.country}</div>
      <div>{product.sortName}</div>
      <div>{product.makingMethod}</div>
      <div>{product.manufacturingMethod}</div>
      <div>{product.teaType}</div>
      <div>{product.active ? 'true' : 'false'}</div>
    </NavLink>
  </div>
));

export default AdminItemForList;
