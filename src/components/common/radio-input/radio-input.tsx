import React from 'react';
import { useField, FormikValues } from 'formik';
import { Radio } from 'antd';

import styles from './radio-input.module.scss';

type Properties<T extends FormikValues> = Omit<
  React.ComponentProps<typeof Radio>,
  'name'
> & {
  name: keyof T;
  value: string;
  label: string;
};

export const FormRadioInput = <T extends FormikValues>({
  name,
  value,
  label,
  ...props
}: Properties<T>) => {
  const [field] = useField(name as string);

  return (
    <>
      <Radio
        {...field}
        {...props}
        value={value}
        checked={field.value === value}
        className={styles.radioInput}
      >
        {label}
      </Radio>
    </>
  );
};
