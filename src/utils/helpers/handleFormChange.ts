/* eslint-disable no-unused-vars */
import { DatePickerProps } from 'antd';

export const handleDateChange = (
  setter: (val: string | null) => void
): DatePickerProps['onChange'] => (_date, dateStr) => {
  if (Array.isArray(dateStr)) {
    setter(null);
  } else {
    setter(dateStr || null);
  }
};

export const handleNumberChange =
  (setter: (val: number | null) => void) => (value: number | null) => {
    setter(value);
  };
