import { IProductPrice } from '@/types/productTypes';
import { ErrorMsg } from '@/types/uiTypes';

export default function priceValidator(prices: IProductPrice[]): ErrorMsg {
  let error = true;
  prices.forEach((price) => {
    if (typeof price === 'object') {
      if (price.weight && price.value) {
        error = false;
      }
    }
  });

  if (error) return 'Поле необходимое для заполнения';
  return '';
}
