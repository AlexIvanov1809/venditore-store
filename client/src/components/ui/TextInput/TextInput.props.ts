import { ErrorMsg, FnOnChange } from '@/types/uiTypes';

export default interface TextInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: FnOnChange;
  error?: ErrorMsg;
  placeholder?: string;
  className?: string;
  id?: number;
  type?: HTMLInputElement['type'];
}
