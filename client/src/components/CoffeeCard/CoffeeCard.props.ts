import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { ICoffeeItem } from "../../store/models/ICoffeeItem";

export interface CoffeeCardProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  coffeeItem: ICoffeeItem;
}
