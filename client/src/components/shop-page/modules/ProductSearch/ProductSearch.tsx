import { useEffect, useState } from 'react';
import { TextInput } from '@/components/ui';
import { FnOnChange } from '@/types/uiTypes';
import { IProduct } from '@/types/productTypes';
import useDebounce from '@/hooks/useDebounce';
import httpService from '@/http/productAPI';

interface Props {
  className: string;
}

const ProductSearch = ({ className }: Props) => {
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const getFoundProduct = useDebounce(productName, fetchSearchingProduct, 500);

  async function fetchSearchingProduct(name: string) {
    try {
      const response = await httpService.searchingProducts(name);
      setProducts(response);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (productName) {
      (async () => {
        await getFoundProduct();
      })();
      return;
    }
    setProducts([]);
  }, [productName]);

  const handleChange: FnOnChange = ({ value }) => {
    if (typeof value === 'string') {
      setProductName(value);
    }
  };
  return (
    <div className={className}>
      <TextInput placeholder="search..." name="productName" value={productName} onChange={handleChange} />
      <div>
        {products.map((product) => (
          <div key={product.id}>{product.sortName}</div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
