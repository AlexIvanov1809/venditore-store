import { IProduct } from '@/types/productTypes';
import httpService from '@/http/productAPI';
import { ImgType } from '@/types/uiTypes';
import makeFormDataFile from './makeFormDataFile';

export default function imgUploader(imgs: ImgType, product: IProduct) {
  const imgIds: (null | number)[] = [null, null, null];
  product.images.forEach((img) => {
    imgIds[img.row] = img.id;
  });

  imgs.forEach(async (file, index) => {
    try {
      const imgId = imgIds[index];
      if (typeof file.image === 'object') {
        const formData = makeFormDataFile(null, [file]);
        if (imgId) {
          await httpService.editProductImage(imgId, formData);
        } else {
          await httpService.createProductImage(product.id, index, formData);
        }
      }
      if (imgId && !file.image) {
        await httpService.removeProductImage(imgId);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw e;
      }
    }
  });
}
