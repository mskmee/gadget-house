import { useState } from 'react';
import cn from 'classnames';
import type { ButtonProps } from '@/interfaces/interfaces';
import styles from './button.module.scss';

export default function ButtonNav({
  icon,
  clickImg,
  hoverImg,
  className,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked((prevState) => prevState);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <>
      <button
        className={cn(styles.headerButton, className)}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <img src={isHovered ? hoverImg : isClicked ? clickImg : icon} />
      </button>
    </>
  );
}
