import { useState } from 'react';

export const useRangeFilter = (initialMin: number, initialMax: number) => {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);
  const [minValueCamera, setMinValueCamera] = useState(initialMin);
  const [maxValueCamera, setMaxValueCamera] = useState(initialMax);
  

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

  const handleMinChangeCamera = (value: number | null) => {
    if (value !== null && value !== 0 && value <= maxValueCamera) {
      setMinValueCamera(value);
    }
  };

  const handleMaxChangeCamera = (value: number | null) => {
    if (value !== null && value !== 0 && value >= minValueCamera) {
      setMaxValueCamera(value);
    }
  };

  return { minValue, maxValue, minValueCamera, maxValueCamera, handleMinChange, handleMaxChange, handleMinChangeCamera, handleMaxChangeCamera };
};
