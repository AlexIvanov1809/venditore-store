import { useEffect, useState } from 'react';
import { TextInput } from '@/components/ui';
import { FnOnChange } from '@/types/uiTypes';
import { IProduct } from '@/types/productTypes';
import useDebounce from '@/hooks/useDebounce';
import httpService from '@/http/productAPI';

interface Props {
  className: string;
}

function ProductSearch({ className }: Props) {
  const [productName, setProductName] = useState('');
  const [products, setProducts] = useState<IProduct[]>([]);
  const debouncedValue = useDebounce<string>(productName, 500);

  useEffect(() => {
    if (productName) {
      (async () => {
        try {
          const response = await httpService.searchingProducts(debouncedValue);
          setProducts(response);
        } catch (e) {
          console.log(e);
        }
      })();
      return;
    }
    setProducts([]);
  }, [debouncedValue]);

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
}

export default ProductSearch;
