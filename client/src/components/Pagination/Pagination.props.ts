import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface PaginationProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  itemsQty: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
