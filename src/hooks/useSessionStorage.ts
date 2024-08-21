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

  const setValue = (newValue: T) => {
    try {
      sessionStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      return;
    }
    setStorageValue(newValue);
  };
  console.log(storageValue);

  return [storageValue, setValue] as const;
};
