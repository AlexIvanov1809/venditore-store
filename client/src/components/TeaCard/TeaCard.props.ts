import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";
import { ITeaItem } from "../../store/models/ITeaItem";

export interface TeaCardProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  teaItem: ITeaItem;
}
