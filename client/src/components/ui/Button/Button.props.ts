import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { icons } from "../../../assets/images";

export type IconName = keyof typeof icons;

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  icon?: IconName;
  appearance: "primary" | "danger";
  children?: ReactNode;
}
