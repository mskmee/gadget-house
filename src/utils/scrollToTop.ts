import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const location = useLocation();
  console.log(location.key);

  useEffect(() => {
    if (location.key) {
      console.log(44444);

      window.scrollTo(0, 0);
    } else {
      console.log(5555);

      window.history.scrollRestoration = 'manual';
    }
  }, [location.pathname, location.key]);
  return null;
};
