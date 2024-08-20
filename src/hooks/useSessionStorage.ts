import { useState } from 'react';
import { TReview } from '../types/Review.type';

export const useSessionStorage = (keyName: string, defaultValue: []) => {
  const [storageValue, setStorageValue] = useState(() => {
    try {
      const value = sessionStorage.getItem(keyName);

      if (value) {
        return JSON.parse(value);
      } else {
        sessionStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: TReview) => {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {}
    setStorageValue(newValue);
  };

  return [storageValue, setValue] as const;
};
