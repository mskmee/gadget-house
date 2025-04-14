import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import ArrowUp from '@/assets/icons/arrow-up.svg';

interface CollapseProps {
  children: React.ReactNode;
  title: React.ReactNode;
  className?: string;
}

export const Collapse: React.FC<CollapseProps> = ({
  children,
  title,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={classNames(styles.collapse, className)}
      aria-expanded={isOpen}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles['collapse__header']}
      >
        <div className={styles['collapse__header-title']}>{title}</div>
        <img
          src={ArrowUp}
          alt={isOpen ? 'Arrow Up Icon' : 'Arrow Down Icon'}
          className={styles['collapse__header-icon']}
        />
      </button>
      <div className={styles['collapse__content']}>
        <div className={styles['collapse__content-wrapper']}>{children}</div>
      </div>
    </div>
  );
};
