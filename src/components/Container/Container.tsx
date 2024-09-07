import cn from 'classnames';
import type { ContainerProps } from '@/types/Container.type';
import styles from './Container.module.scss';

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn(styles.container, className)} {...props}>
      {children}
    </div>
  );
}
