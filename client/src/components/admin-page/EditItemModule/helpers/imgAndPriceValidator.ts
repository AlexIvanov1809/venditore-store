import { IProductPrice } from '@/types/productTypes';
import { ErrorMsg } from '@/types/uiTypes';

type DataImage = string | File;

export default function imgAndPriceValidator(data: DataImage[] | IProductPrice[], type: 'image' | 'price'): ErrorMsg {
  const errors = { img: true, price: true };
  data.forEach((item) => {
    if (type === 'image') {
      if (item) {
        errors.img = false;
      }
    }
    if (type === 'price' && typeof item === 'object') {
      if (item.weight && item.value) {
        errors.price = false;
      }
    }
  });

  if (type === 'image') {
    if (errors.img) return 'Нужно прикрепить фото';
  } else if (errors.price) return 'Поле необходимое для заполнения';
  return '';
}
