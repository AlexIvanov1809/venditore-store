import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface BuyButtonProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  getChange: (qty: number) => void;
  bought: boolean;
  onOrder?: (type: string) => void;
}
