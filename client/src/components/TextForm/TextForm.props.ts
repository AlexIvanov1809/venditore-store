import { InputHTMLAttributes, DetailedHTMLProps } from "react";

export interface TextFormProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  name: string;
  type: string;
  value: string | number;
  getChange: (target: { name: string; value: string }) => void;
  error?: string;
}
