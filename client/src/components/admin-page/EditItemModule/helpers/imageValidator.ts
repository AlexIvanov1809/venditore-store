import { ErrorMsg, ImgType } from '@/types/uiTypes';

export default function imageValidator(images: ImgType): ErrorMsg {
  let error = true;
  images.forEach((image) => {
    if (image.image) {
      error = false;
    }
  });

  if (error) return 'Нужно прикрепить фото';
  return '';
}
