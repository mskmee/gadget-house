import { useState, useEffect } from 'react';

export const useIsFixedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const headerTopSectionHeight =
      document.getElementById('header-top-section')?.clientHeight;

    const handleScroll = () => {
      if (headerTopSectionHeight) {
        setIsScrolled(window.scrollY > headerTopSectionHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return isScrolled;
};
