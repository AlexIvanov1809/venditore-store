import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ImageLoaderFieldProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  mainImagePath: string;
  type: "drip" | "kg" | "quarter" | "tea";
  getChange: (
    file: string | File,
    type: "drip" | "kg" | "quarter" | "tea",
  ) => void;
  remove: boolean;
  error: boolean;
}
