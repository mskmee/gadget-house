import { useField, FormikValues } from 'formik';
import { Input, InputProps } from 'antd';
const { TextArea } = Input;
import { useId } from 'react';
import cn from 'classnames';

import { ErrorIcon } from '@/assets/constants';

import styles from './form-input.module.scss';

type Properties<T extends FormikValues> = Omit<InputProps, 'name'> & {
  name: keyof T;
  label?: string;
  span?: string;
};

export const FormInput = <T extends FormikValues>({
  label,
  name,
  span,
  ...props
}: Properties<T>) => {
  const [field, meta] = useField(name as string);
  const id = useId();
  const inputId = props.id ?? id;
  const isError = meta.touched && meta.error;

  return (
    <>
      {span ? (
        <label className={styles.formInput__radio}>
          <Input
            {...field}
            {...props}
            id={inputId}
            status={isError ? 'error' : ''}
          />
          {span && <span>{span}</span>}
        </label>
      ) : (
        label && (
          <label className={cn(styles.formInput__input)} htmlFor={inputId}>
            <span>{label}</span>
            {label === 'Comment' ? (
              <TextArea
                {...field}
                {...props}
                id={inputId}
                status={isError ? 'error' : ''}
              />
            ) : (
              <Input
                {...field}
                {...props}
                id={inputId}
                status={isError ? 'error' : ''}
              />
            )}
            {isError ? (
              <div className={styles.formInput__error}>
                <img src={ErrorIcon} alt="Error icon" />
                {meta.error}
              </div>
            ) : null}
          </label>
        )
      )}
    </>
  );
};
