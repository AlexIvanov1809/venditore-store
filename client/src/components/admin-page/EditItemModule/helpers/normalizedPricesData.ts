import httpService from '@/http/productAPI';
import { IProductPrice } from '@/types/productTypes';

export default function normalizedPricesData(prices: IProductPrice[], oldPrices: IProductPrice[]): IProductPrice[] {
  const fullCopy = JSON.parse(JSON.stringify(prices));

  oldPrices.forEach(async (price, index) => {
    if (fullCopy[index]) {
      fullCopy[index].id = price.id;
      fullCopy[index].productId = price.productId;
      return;
    }

    try {
      await httpService.removePriceProduct(price.id);
    } catch (e: any) {
      throw Error(e);
    }
  });

  return fullCopy;
}
