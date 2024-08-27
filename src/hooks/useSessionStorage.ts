import { useState } from 'react';

export const useSessionStorage = <T>(keyName: string, defaultValue: T) => {
  const [storageValue, setStorageValue] = useState<T>(() => {
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

  const setValue = (value: T) => {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(value));
    } catch (err) {
      return;
    }
    setStorageValue(value);
  };

  return [storageValue, setValue] as const;
};
