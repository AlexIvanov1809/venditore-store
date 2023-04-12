import { IProductPrice } from '@/types/productTypes';

type DataImage = string | File;

export default function imgAndPriceValidator(data: DataImage[] | IProductPrice[], type: 'image' | 'price') {
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
    if (errors.img) return { image: 'Нужно прикрепить фото' };
  } else if (errors.price) return { price: 'Поле необходимое для заполнения' };
}
