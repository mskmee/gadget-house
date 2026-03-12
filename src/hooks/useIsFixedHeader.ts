import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useIsFixedHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleHeaderState = () => {
      const headerTopSectionHeight =
        document.getElementById('header-top-section')?.getBoundingClientRect()
          .height ?? 0;

      setIsScrolled(window.scrollY >= headerTopSectionHeight);
    };

    const frameId = window.requestAnimationFrame(handleHeaderState);

    window.addEventListener('scroll', handleHeaderState, { passive: true });
    window.addEventListener('resize', handleHeaderState);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleHeaderState);
      window.removeEventListener('resize', handleHeaderState);
    };
  }, [location.pathname]);

  return isScrolled;
};
