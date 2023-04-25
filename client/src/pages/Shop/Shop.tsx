import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Loader } from '@/components/ui';
import { TypeBar, Aside, CardList, Pagination, ProductSearch } from '@/components/shop-page/modules';
import httpService from '@/http/productAPI';
import { ENTITY_TYPES } from '@/constants/adminPageConstants';
import { useRootStore } from '@/context/StoreContext';
import styles from './Shop.module.scss';
import { useErrorBoundary, withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';

const Shop = observer(() => {
  const { products } = useRootStore();
  const [isLoading, setIsLoading] = useState(false);
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (() => {
      ENTITY_TYPES.forEach(async (item) => {
        try {
          const data = await httpService.fetchEntityItems(item.endpoint, signal);
          products[item.setter](data);
        } catch (e: any) {
          if (e.message !== 'canceled') {
            showBoundary(e);
          }
        } finally {
          if (item.getter === 'types') {
            products.setSelectedType(products.types[0]?.id ? products.types[0].id : '');
          }
        }
      });
    })();

    return () => {
      controller.abort();
    };
  }, [products]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
      try {
        setIsLoading(true);
        const data = await httpService.fetchProducts(
          {
            typeId: products.selectedType,
            brandId: products.selectedBrand,
            countryId: products.selectedCountry,
            makingMethodId: products.selectedMakingMethod,
            manufacturingMethodId: products.selectedManufacturingMethod,
            teaTypeId: products.selectedTeaType,
            packageTypeId: products.selectedPackageType,
            sortBy: products.selectedSortBy,
            page: products.page,
            limit: products.limit
          },
          signal
        );
        products.setProducts(data.rows);
        products.setTotalCount(data.count);
        setIsLoading(false);
      } catch (e: any) {
        if (e.message !== 'canceled') {
          showBoundary(e);
          setIsLoading(false);
        }
      }
    })();

    return () => {
      controller.abort();
    };
  }, [
    products.selectedType,
    products.selectedBrand,
    products.selectedCountry,
    products.selectedMakingMethod,
    products.selectedManufacturingMethod,
    products.selectedTeaType,
    products.selectedPackageType,
    products.selectedSortBy,
    products.page
  ]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (products.selectedType) {
      ENTITY_TYPES.forEach(async (item) => {
        try {
          const data = await httpService.fetchEntityFilterItems(item.endpoint, products.selectedType, signal);
          products[item.setter](data);
        } catch (e: any) {
          if (e.message !== 'canceled') {
            showBoundary(e);
          }
        }
      });
    }

    return () => {
      controller.abort();
    };
  }, [products.selectedType]);

  return (
    <main className={styles.main_shop}>
      <ProductSearch className={styles.search} />
      <TypeBar className={styles.type} />
      <Aside className={styles.aside} />
      <CardList className={styles.shop} />
      <Pagination className={styles.pagination} />
      {isLoading && <Loader />}
    </main>
  );
});

export default withErrorBoundary(Shop, { FallbackComponent: ErrorFallback });
