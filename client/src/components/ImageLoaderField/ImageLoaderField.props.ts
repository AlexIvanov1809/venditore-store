import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ImageLoaderFieldProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  mainImagePath: string;
  type: "drip" | "kg" | "quarter";
  getChange: (file: string | File, type: "drip" | "kg" | "quarter") => void;
  remove: boolean;
  error: boolean;
}
