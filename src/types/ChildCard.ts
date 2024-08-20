import { ReactNode } from 'react';
import styles from '../components/Carousels.module.css';
import { ResponsiveSettings } from './responsive';

export type ChildCard = {
  children: ReactNode;
  classname?: keyof typeof styles;
  responsive?: ResponsiveSettings[];
};
