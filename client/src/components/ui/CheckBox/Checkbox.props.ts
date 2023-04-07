import { ErrorMsg, FnOnChange } from "@/types/uiTypes";
import { ReactNode } from "react";

export interface CheckboxProps {
  error?: ErrorMsg;
  name: string;
  children: ReactNode;
  value: boolean;
  onChange: FnOnChange;
  className?: string;
}
