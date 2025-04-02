import React from "react";

const checkKeydownEvent = (key: string): boolean => {
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

export const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (!checkKeydownEvent(event.key)) {
    event.preventDefault();
  }
};
