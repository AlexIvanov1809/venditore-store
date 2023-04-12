import { IProduct } from '@/types/productTypes';
import { HideFn } from '@/types/uiTypes';
import { Dispatch, SetStateAction } from 'react';

export default interface EditItemModuleProps {
  product?: IProduct;
  onHide: HideFn;
  onUpdated: Dispatch<SetStateAction<boolean>>;
}
