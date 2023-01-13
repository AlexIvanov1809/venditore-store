import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { Images } from "../../store/models/ICoffeeItem";

export interface CoffeeImgItemProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  item: string;
  images: Images;
}
