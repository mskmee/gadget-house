import { useState } from 'react';

export function useProductCardHandlers() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickBuy = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 150);
  };

  return {
    isClicked,
    setIsClicked,
    handleClickBuy,
  };
}
