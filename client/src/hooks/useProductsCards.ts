import { useRootStore } from '@/context/StoreContext';

const useProductsCards = () => {
  const { products } = useRootStore();

  if (!(products.products?.length > 0)) {
    return [];
  }

  return products.products.filter((item) => item.active);
};

export default useProductsCards;
