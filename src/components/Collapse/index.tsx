import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import ArrowUp from '@/assets/icons/arrow-up.svg';

interface CollapseProps {
  children: React.ReactNode;
  title: React.ReactNode;
  onToggle: () => void;
  isOpen: boolean;
  className?: string;
}

export const Collapse: React.FC<CollapseProps> = ({
  children,
  title,
  onToggle,
  isOpen,
  className,
}) => {
  return (
    <div
      className={classNames(styles.collapse, className)}
      aria-expanded={isOpen}
    >
      <button
        onClick={onToggle}
        className={classNames(styles['collapse__header'], {
          [styles['isOpen']]: isOpen,
        })}
      >
        <div className={styles['collapse__header-title']}>{title}</div>
        <div>
          <img
            src={ArrowUp}
            alt={isOpen ? 'Arrow Up Icon' : 'Arrow Down Icon'}
            className={styles['collapse__header-icon']}
          />
        </div>
      </button>
      <div className={styles['collapse__content']}>
        <div className={styles['collapse__content-wrapper']}>{children}</div>
      </div>
    </div>
  );
};
