import { IProductPrice } from '@/types/productTypes';

export default function removedPriceIds(newPrice: IProductPrice[], price: IProductPrice[]) {
  const arr = [...newPrice, ...price];
  const obj = arr.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id] += 1;
      return acc;
    }
    acc[item.id] = 1;
    return acc;
  }, {} as { [key: string]: number });
  const result = Object.keys(obj).filter((key) => obj[key] === 1 && parseInt(key) < 1680004496709);
  return result;
}
