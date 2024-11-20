
export const checkKeydownEvent = (key: string): boolean => {

  return (
    /^\d$/.test(key) ||
    key === 'Backspace' ||
    key === 'Delete' ||
    key === 'Tab' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'Home' ||
    key === 'End'
  );
};
