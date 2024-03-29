import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FnOnChange, SortProps } from '@/types/uiTypes';
import { IProduct, SortTypes } from '@/types/productTypes';
import { Button, IconButton, Loader, TextInput } from '@/components/ui';
import { EntityContainer, AdminItemForList, EditItemModule } from '@/components/admin-page';
import httpService from '@/http/productAPI';
import { ADMIN_ITEM_FIELDS, ENTITY_TYPES } from '@/constants/adminPageConstants';
import { useRootStore } from '@/context/StoreContext';
import orderBy from 'lodash.orderby';
import AdminErrorBoundary from '@/components/admin-page/AdminErrorBoundary/AdminErrorBoundary';
import makeErrorMsg from '@/components/admin-page/utils/makeErrorMsg';
import UsersModule from '@/components/admin-page/UsersModule/UsersModule';
import Triangle from '@/assets/icons/triangle.svg';
import styles from './Admin.module.scss';
import changeProductSortWay from './changeProductSortWay';

const Admin = observer(() => {
  const { products, adminErrors } = useRootStore();
  const [isLoading, setIsLoading] = useState(false);
  const [entityIsOpen, setEntityIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [updated, setUpdated] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState<SortProps>({
    type: 'type',
    sort: 'asc'
  });

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (updated) {
      setIsLoading(true);
      (async () => {
        try {
          const data = await httpService.fetchProducts({}, signal);
          products.setProducts(data.rows);
          setUpdated(false);
        } catch (e: unknown) {
          if (!(e instanceof Error)) {
            return;
          }
          if (e.message !== 'canceled') {
            const errorMsg = makeErrorMsg(e);
            adminErrors.setError(errorMsg);
          }
        } finally {
          const sortedProducts = orderBy(products.products, sortType.type, sortType.sort);
          products.setProducts(sortedProducts);
          setIsLoading(false);
        }
      })();
    }
    return () => {
      controller.abort();
    };
  }, [updated]);

  useEffect(() => {
    const sortedProducts = orderBy(products.products, sortType.type, sortType.sort);
    products.setProducts(sortedProducts);
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

  const filteredProducts = searchItems(products.products);

  return (
    <main className={styles.admin}>
      <UsersModule />
      <div>
        <div data-entity={entityIsOpen} className={styles.admin_types}>
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
        <Button onClick={() => setEntityIsOpen(!entityIsOpen)} appearance="primary">
          {entityIsOpen ? 'close' : 'open'}
        </Button>
      </div>
      <hr />
      <div className={styles.admin_items}>
        <div className={styles.on_top}>
          <TextInput name="searchQuery" value={searchQuery} onChange={handleSearch} placeholder="Поиск по названию" />
          <IconButton appearance="primary" onClick={onHide} icon="Add" />
        </div>
        <div className={styles.items_fields}>
          {ADMIN_ITEM_FIELDS.map((field) => (
            <div key={field.id}>
              <button className={styles.adminBtn} type="button" onClick={() => onClick(field.type)}>
                <span
                  data-sort-min={sortType.sort === 'asc'}
                  className={styles[field.type === sortType.type ? 'sortIcon' : 'sortDisabled']}
                >
                  <Triangle />
                </span>
                {field.name}
              </button>
            </div>
          ))}
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          filteredProducts.map((product) => <AdminItemForList key={product.id} product={product} />)
        )}
      </div>
      <AdminErrorBoundary />
      {show && <EditItemModule onUpdated={setUpdated} onHide={onHide} />}
    </main>
  );
});

export default Admin;
