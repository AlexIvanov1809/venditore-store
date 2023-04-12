import { ErrorMsg } from '@/types/uiTypes';

export default interface ImgInputProps {
  name: string;
  index: number;
  onChange: (index: number, file: File | string) => void;
  error?: ErrorMsg;
  picName: string | File;
}
