import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Loader } from '@/components/ui';
import { TypeBar, Aside, CardList, Pagination } from '@/components/shop-page';
import httpService from '@/http/productAPI';
import { ENTITY_TYPES } from '@/constants/consts';
import { useRootStore } from '@/context/StoreContext';
import { frontDataAdapter } from '@/utils';
import styles from './Shop.module.css';

const Shop = observer(() => {
  const { products } = useRootStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (() => {
      ENTITY_TYPES.forEach(async (item) => {
        try {
          const data = await httpService.fetchEntityItems(item.endpoint);
          products[item.setter](data);
        } catch (e) {
          console.log(e);
        } finally {
          if (item.getter === 'types') {
            products.setSelectedType(products.types[0]?.id ? products.types[0].id : '');
          }
          setIsLoading(false);
        }
      });
    })();
  }, [products]);

  useEffect(() => {
    (async () => {
      try {
        const data = await httpService.fetchProducts({
          typeId: products.selectedType,
          brandId: products.selectedBrand,
          countryId: products.selectedCountry,
          makingMethodId: products.selectedMakingMethod,
          manufacturingMethodId: products.selectedManufacturingMethod,
          teaTypeId: products.selectedTeaType,
          packageTypeId: products.selectedPackageType,
          page: products.page,
          limit: products.limit
        });
        products.setProducts(frontDataAdapter(data.rows));
        products.setTotalCount(data.count);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [
    products.selectedType,
    products.selectedBrand,
    products.selectedCountry,
    products.selectedMakingMethod,
    products.selectedManufacturingMethod,
    products.selectedTeaType,
    products.selectedPackageType,
    products.page
  ]);

  useEffect(() => {
    if (products.selectedType) {
      (() => {
        try {
          ENTITY_TYPES.forEach(async (item) => {
            const data = await httpService.fetchEntityFilterItems(item.endpoint, products.selectedType);
            products[item.setter](data);
          });
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [products.selectedType]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <main className={styles.main_shop}>
      <TypeBar className={styles.type} />
      <Aside className={styles.aside} />
      <CardList className={styles.shop} />
      <Pagination className={styles.pagination} />
    </main>
  );
});

export default Shop;
