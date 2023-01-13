import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

interface IOptions {
  _id: number;
  value: string | number;
}

export interface IChangeFn {
  name: string;
  value: string | number;
}

export interface SelectFieldProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  label: string;
  value: number | string;
  getChange: (item: IChangeFn) => void;
  defaultOption: number | string;
  options: IOptions[];
  error?: string;
  name: string;
}
