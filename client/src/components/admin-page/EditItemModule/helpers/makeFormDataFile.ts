import { INewProduct } from '@/types/productTypes';

export default function makeFormDataFile(product: INewProduct | null, images: (string | File)[]) {
  const formData = new FormData();
  if (images) {
    images.forEach((image) => {
      if (typeof image === 'object') {
        formData.append('img', image);
      }
    });
  }

  if (product) {
    let key: keyof INewProduct;
    for (key in product) {
      const fieldData = product[key];
      if (fieldData) {
        formData.append(key, fieldData as string);
      }
    }
  }
  return formData;
}
