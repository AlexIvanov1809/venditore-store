import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FnOnChange, SortProps } from '@/types/uiTypes';
import { IProduct, SortTypes } from '@/types/productTypes';
import { IconButton, Loader, TextInput } from '@/components/ui';
import { EntityContainer, AdminItemForList, EditItemModule } from '@/components/admin-page';
import httpService from '@/http/productAPI';
import { frontDataAdapter } from '@/utils';
import changeProductSortWay from './wayOfSortingItems';
import { ADMIN_ITEM_FIELDS, ENTITY_TYPES } from '@/constants/adminPageConstants';
import { useRootStore } from '@/context/StoreContext';
import styles from './Admin.module.scss';

const Admin = observer(() => {
  const { products } = useRootStore();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<SortProps>({
    type: 'type',
    sort: 'asc'
  });

  useEffect(() => {
    if (updated) {
      setIsLoading(true);
      (async () => {
        try {
          const data = await httpService.fetchProducts();
          products.setProducts(frontDataAdapter(data.rows));
        } catch (e) {
          console.log(e);
        } finally {
          products.productSorting(sortType.type as 'type', sortType.sort);
          setUpdated(false);
          setIsLoading(false);
        }
      })();
    }
  }, [updated]);

  useEffect(() => {
    if (Array.isArray(products.products)) {
      products.productSorting(sortType.type, sortType.sort);
    }
  }, [sortType]);

  const handleSearch: FnOnChange = ({ value }) => {
    if (typeof value !== 'string') {
      return;
    }
    setSearchQuery(value);
  };

  const onClick = (type: keyof SortTypes) => {
    const sort = changeProductSortWay(type, sortType);
    setSortType(sort);
  };

  const onHide = () => {
    setShow(!show);
  };

  function searchItems(data: IProduct[]) {
    const filteredData = searchQuery
      ? data.filter((product) => product.sortName.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
      : data;

    return filteredData;
  }

  const filteredItems = searchItems(products.products);

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
            isBlack={type.isBlack}
          />
        ))}
      </div>
      <hr />
      <div className={styles.admin_items}>
        <TextInput name="searchQuery" value={searchQuery} onChange={handleSearch} placeholder="Поиск по названию" />
        <div className={styles.items_fields}>
          {ADMIN_ITEM_FIELDS.map((i) => (
            <div onClick={() => onClick(i.type)} key={i.id}>
              {i.name}
            </div>
          ))}
          <IconButton appearance="primary" onClick={onHide} icon="Add" />
        </div>
        {isLoading ? <Loader /> : filteredItems.map((i) => <AdminItemForList key={i.id} product={i} />)}
      </div>
      {show && <EditItemModule onUpdated={setUpdated} onHide={onHide} />}
    </main>
  );
});

export default Admin;
