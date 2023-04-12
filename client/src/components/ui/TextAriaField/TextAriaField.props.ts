import { ErrorMsg, FnOnChange } from '@/types/uiTypes';

export default interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string | null;
  onChange: FnOnChange;
  error?: ErrorMsg;
}
