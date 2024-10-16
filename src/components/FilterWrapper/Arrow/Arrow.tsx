import cn from 'classnames';
import type { ArrowButtonProps } from '@/types/catalog.types';
import styles from './Arrow.module.scss';

export default function Arrow({ isOpen }: ArrowButtonProps) {
  return (
    <svg
      className={cn(styles.container, styles[String(isOpen)])}
      width="14.839478"
      height="8.169800"
      viewBox="0 0 14.8395 8.1698"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14.08 7.41L7.41 0.75L0.75 7.41" stroke="#000000" />
    </svg>
  );
}
