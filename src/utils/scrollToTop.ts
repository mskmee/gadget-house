import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.key) {
      window.scrollTo(0, 0);
    } else {
      window.history.scrollRestoration = 'manual';
    }
  }, [location.pathname, location.key]);
  return null;
};
