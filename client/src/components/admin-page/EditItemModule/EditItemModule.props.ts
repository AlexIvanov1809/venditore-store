import { IProduct } from '@/types/productTypes';
import { HideFn } from '@/types/uiTypes';
import { Dispatch, SetStateAction } from 'react';

export default interface EditItemModuleProps {
  product?: IProduct;
  onHide: HideFn;
  updated: Dispatch<SetStateAction<boolean>>;
}
