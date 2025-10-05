import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './navbutton.module.scss';

interface INavButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export const NavButton: FC<INavButtonProps> = ({
  href,
  onClick,
  children,
  className,
}) => {
  const buttonClass = `${styles.headerButton} ${className || ''}`.trim();

  if (href) {
    return (
      <Link to={href} className={buttonClass} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};
