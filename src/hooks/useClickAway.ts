import { useEffect, RefObject } from 'react';

/**
 * Custom hook to detect clicks outside of a specified element.
 *
 * @param {React.RefObject<HTMLElement>} ref - The reference to the element.
 * @param {Function} onClickAway - The callback function to execute when clicking outside.
 */
const useClickAway = (ref: RefObject<HTMLElement>, onClickAway: () => void) => {
  useEffect(() => {
    // Function to handle click events
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if the click is outside the referenced element
      if (target.id !== 'header-logo' && target.id !== 'catalog-list') {
        onClickAway();
      }
    };

    // Add the click event listener
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, onClickAway]); // Re-run the effect if ref or onClickAway changes
};

export default useClickAway;
