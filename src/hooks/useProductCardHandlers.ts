import { useState } from 'react';

export default function useProductCardHandlers() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const handleClickBuy = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleClickLike = () => {
    setIsLiked((prevState) => !prevState);
  };

  return {
    isHovered,
    setIsHovered,
    isClicked,
    setIsClicked,
    isLiked,
    setIsLiked,
    isMouseDown,
    setIsMouseDown,
    handleClickBuy,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseEnter,
    handleClickLike,
  };
}
