import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface CoffeeMarketProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  handleOrder: (type: "continue" | undefined) => void;
}
