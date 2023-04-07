import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styles from "./Shop.module.css";
import { Loader } from "../../components/ui";
import { TypeBar, Aside, CardList, Pagination } from "../../components/shop-page";
import httpService from "../../http/productAPI";
import { ENTITY_TYPES } from "../../utils/consts";
import { Context } from "../../main";

const Shop = observer(() => {
  const { products } = useContext(Context);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ENTITY_TYPES.forEach((item) => {
      httpService
        .fetchEntityItems(item.endpoint)
        .then((data) => {
          products[item.setter](data);
        })
        .catch((e) => e)
        .finally(() => {
          if (item.getter === "types") {
            products.setSelectedType(products.types[0]?.id ? products.types[0]?.id : "");
          }
        });
    });
  }, [products]);

  useEffect(() => {
    httpService
      .fetchProducts(
        products.selectedType,
        products.selectedBrand,
        products.selectedCountry,
        products.selectedMakingMethod,
        products.selectedManufacturingMethod,
        products.selectedTeaType,
        products.selectedPackageType,
        products.page,
        products.limit
      )
      .then((data) => {
        products.setProducts(data.rows);
        products.setTotalCount(data.count / 2);
      })
      .catch((e) => console.log(e.response.data.message));
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
      ENTITY_TYPES.forEach((item) => {
        httpService
          .fetchEntityFilterItems(item.endpoint, products.selectedType)
          .then((data) => {
            products[item.setter](data);
            setIsLoading(false);
          })
          .catch((e) => console.log(e.response.data.message));
      });
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
