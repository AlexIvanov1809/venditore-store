import { IProductPrice } from '@/types/productTypes';
import { ErrorMsg, FnOnChange } from '@/types/uiTypes';
import React from 'react';

export default interface AddPriceValueProps {
  price: IProductPrice;
  className: string;
  onChange: FnOnChange;
  removePrice: (e: React.MouseEvent, id: IProductPrice['id']) => void;
  error?: ErrorMsg;
}
