import { ReactNode } from 'react';
import styles from '../components/Carousels.module.css';
import { ResponsiveSettings } from '../interfaces/interfaces';

export type TextLink = {
  text: string;
  link: string;
};

export type ChildCard = {
  children: ReactNode;
  className?: keyof typeof styles;
  responsive?: ResponsiveSettings[];
};
