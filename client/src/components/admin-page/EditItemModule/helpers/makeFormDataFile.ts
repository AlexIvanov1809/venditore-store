import { INewProduct } from '@/types/productTypes';
import { ImgType } from '@/types/uiTypes';

export default function makeFormDataFile(product: INewProduct | null, images: ImgType) {
  const formData = new FormData();
  if (images) {
    images.forEach((image) => {
      const data = image.image;
      if (typeof data === 'object') {
        console.log(data);
        formData.append('img', data);
      }
    });
  }

  if (product) {
    Object.keys(product).forEach((key) => {
      const fieldData = product[key as keyof INewProduct];
      if (formData) {
        formData.append(key, fieldData as string);
      }
    });
  }
  return formData;
}
