import { ErrorMsg } from '@/types/uiTypes';

type DataImage = string | File;

export default function imageValidator(images: DataImage[]): ErrorMsg {
  let error = true;
  images.forEach((image) => {
    if (image) {
      error = false;
    }
  });

  if (error) return 'Нужно прикрепить фото';
  return '';
}
