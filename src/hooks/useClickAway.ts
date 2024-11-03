import { useEffect } from 'react';

/**
 * Custom hook to detect clicks outside of a specified element.
 *
 * @param {React.RefObject<HTMLElement>} ref - The reference to the element.
 * @param {Function} onClickAway - The callback function to execute when clicking outside.
 */
const useClickAway = (ref, onClickAway) => {
  useEffect(() => {
    // Function to handle click events
    const handleClickOutside = (event) => {
      // Check if the click is outside the referenced element
      if (
        event.target.id !== 'header-logo' ||
        event.target.id !== 'catalog-list'
      ) {
        console.log(event.target);

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
