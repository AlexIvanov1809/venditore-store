import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import icons from '@/assets/icons';

export type IconName = keyof typeof icons;

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  appearance: 'primary' | 'danger';
  children: ReactNode;
}
