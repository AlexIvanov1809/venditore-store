import { DetailedHTMLProps, HtmlHTMLAttributes } from 'react';

export interface CardPriceProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  price: { id: number; weight: string; value: number | string };
  active: boolean;
}
