import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { SortProps } from '@/types/uiTypes';
import { IProduct } from '@/types/productTypes';
import styles from './Admin.module.scss';
import { Button, Loader } from '@/components/ui';
import { EntityContainer, AdminItemForList, EditItemModule } from '@/components/admin-page';
import httpService from '@/http/productAPI';
import { frontDataAdapter, wayOfSortingItems } from '@/utils';
import { ADMIN_ITEM_FIELDS, ENTITY_TYPES } from '@/constants/consts';
import { useRootStore } from '@/context/StoreContext';

const Admin = observer(() => {
  const { products } = useRootStore();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(true);
  const [sortType, setSortType] = useState<SortProps>({
    type: 'type',
    sort: 'asc'
  });

  useEffect(() => {
    if (updated) {
      setIsLoading(true);
      httpService
        .fetchProducts()
        .then((data) => products.setProducts(frontDataAdapter(data.rows)))
        .catch((e) => console.log(e.response.data.message))
        .finally(() => {
          products.productSorting(sortType.type as 'type', sortType.sort);
          setUpdated(false);
          setIsLoading(false);
        });
    }
  }, [products, updated]);

  useEffect(() => {
    if (Array.isArray(products.products)) {
      products.productSorting(sortType.type, sortType.sort);
    }
  }, [sortType]);

  const onClick = (type: keyof IProduct) => {
    const sort = wayOfSortingItems(type, sortType);
    setSortType(sort);
  };

  const onHide = () => {
    setShow(!show);
  };
  return (
    <main className={styles.admin}>
      <div className={styles.admin_types}>
        {ENTITY_TYPES.map((type) => (
          <EntityContainer
            key={type.id}
            endpoint={type.endpoint}
            label={type.label}
            getter={type.getter}
            setter={type.setter}
          />
        ))}
      </div>
      <hr />
      <div className={styles.admin_items}>
        <div className={styles.items_fields}>
          {ADMIN_ITEM_FIELDS.map((i) => (
            <div onClick={() => onClick(i.type)} key={i.id}>
              {i.name}
            </div>
          ))}
          <Button appearance="primary" onClick={onHide} icon="Add" />
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          products.products &&
          Array.isArray(products.products) &&
          products.products.length > 0 &&
          products.products.map((i) => <AdminItemForList key={i.id} product={i} />)
        )}
      </div>
      {show && <EditItemModule updated={setUpdated} onHide={onHide} />}
    </main>
  );
});

export default Admin;
