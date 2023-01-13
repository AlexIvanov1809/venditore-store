import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { ICoffeeItem } from "../../store/models/ICoffeeItem";

export interface PriceItemProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  item: ICoffeeItem;
  handleChange: (itemName: string) => void;
}
