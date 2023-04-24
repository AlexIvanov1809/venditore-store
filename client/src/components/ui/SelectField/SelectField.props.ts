import { ErrorMsg, FnOnChange, Options } from '@/types/uiTypes';

export default interface SelectFieldProps {
  label: string;
  value: number | string | null;
  onChange: FnOnChange;
  defaultOption?: string;
  options: (Options | undefined)[];
  error?: ErrorMsg;
  name?: string;
}
