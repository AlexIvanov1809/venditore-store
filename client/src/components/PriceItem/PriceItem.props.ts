import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { ICoffeeItem } from "../../models/ICoffeeItem";

export interface PriceItemProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  item: ICoffeeItem;
  handleChange: (itemName: "drip" | "kg" | "quarter") => void;
}
