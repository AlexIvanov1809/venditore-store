import { InputHTMLAttributes, DetailedHTMLProps } from "react";

export interface TextAriaFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  name: string;
  value: string | number;
  getChange: (target: { name: string; value: string }) => void;
  error?: string;
}
