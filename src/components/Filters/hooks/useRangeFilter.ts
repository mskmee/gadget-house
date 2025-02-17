import { useState } from 'react';

export const useRangeFilter = (initialMin: number, initialMax: number) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMinChange = (value: number | null) => {
    if (value !== null && value <= maxValue) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (value: number | null) => {
    if (value !== null && value >= minValue) {
      setMaxValue(value);
    }
  };

  return { minValue, maxValue, handleMinChange, handleMaxChange };
};
