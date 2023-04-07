import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { IProduct } from "@/types/productType";
import styles from "./AdminItemForList.module.css";

interface Item {
  product: IProduct;
}

const AdminItemForList = observer(({ product }: Item) => (
  <div className={styles.admin_item}>
    <NavLink to={`/admin/product/${product.id}`}>
      <div>{product.type?.name}</div>
      <div>{product.brand?.name}</div>
      <div>{product.country?.name}</div>
      <div>{product.sortName}</div>
      <div>{product.making_method?.name}</div>
      <div>{product.manufacturing_method?.name}</div>
      <div>{product.tea_type?.name}</div>
      <div>{product.active ? "true" : "false"}</div>
    </NavLink>
  </div>
));

export default AdminItemForList;
