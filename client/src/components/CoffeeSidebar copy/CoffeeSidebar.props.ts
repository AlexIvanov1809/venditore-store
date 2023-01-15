import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { SelectedItems } from "../../pages/coffeePages/CoffeeMarket/CoffeeMarket";

export interface CoffeeSidebarProps
  extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLElement>, HTMLElement> {
  getSelect: (item: SelectedItems) => void;
}
