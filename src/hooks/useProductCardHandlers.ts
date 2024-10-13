import { useState } from 'react';

export function useProductCardHandlers() {
  const [isClicked, setIsClicked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleClickBuy = (e) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };

  const handleClickLike = (e) => {
    e.preventDefault();
    setIsLiked((prevState) => !prevState);
  };

  return {
    isClicked,
    setIsClicked,
    isLiked,
    setIsLiked,
    handleClickBuy,
    handleClickLike,
  };
}
