import { IProduct } from '@/types/productTypes';
import httpService from '@/http/productAPI';
import makeFormDataFile from './makeFormDataFile';

export default function imgUploader(imgs: (string | File)[], product: IProduct) {
  const imgIds: (null | number)[] = [null, null, null];
  product.images.forEach((img) => {
    imgIds[img.row] = img.id;
  });

  imgs.forEach(async (file, index) => {
    try {
      if (typeof file === 'object') {
        const formData = makeFormDataFile(null, [file]);
        if (imgIds[index]) {
          await httpService.editProductImage(imgIds[index] as number, formData);
        } else {
          await httpService.createProductImage(product.id, index, formData);
        }
      }
      if (imgIds[index] && !file) {
        await httpService.removeProductImage(imgIds[index] as number);
      }
    } catch (e) {
      console.log(e);
    }
  });
}
