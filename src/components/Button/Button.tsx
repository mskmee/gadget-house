import { useState } from 'react';
import styles from './button.module.scss';
import { ButtonProps } from '../../interfaces/interfaces';

export default function ButtonNav({ icon, clickImg, hoverImg }: ButtonProps) {
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
        className={styles.headerButton}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={isHovered ? hoverImg : isClicked ? clickImg : icon} />
      </button>
    </>
  );
}
