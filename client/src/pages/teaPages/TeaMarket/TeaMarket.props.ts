import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface TeaMarketProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  handleOrder: (type: "continue" | undefined) => void;
}
