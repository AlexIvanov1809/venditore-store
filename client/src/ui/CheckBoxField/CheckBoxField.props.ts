import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";
import { IHandleChange } from "../../components/FilterGroupList/FilterGroupList";

export interface CheckBoxFieldProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: boolean;
  name: string;
  getChange: (item: IHandleChange) => void;
  children: ReactNode;
  error?: string;
}
