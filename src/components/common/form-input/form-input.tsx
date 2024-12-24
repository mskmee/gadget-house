import { useField, FormikValues } from 'formik';
import { Input, InputProps } from 'antd';
import { useId } from 'react';

type Properties<T extends FormikValues> = Omit<InputProps, 'name'> & {
  name: keyof T;
  label?: string;
};

export const FormInput = <T extends FormikValues>({
  label,
  name,
  ...props
}: Properties<T>) => {
  const [field, meta] = useField(name as string);
  const id = useId();
  const inputId = props.id ?? id;
  const isError = meta.touched && meta.error;

  return (
    <div>
      {label && <label htmlFor={inputId}>{label}</label>}
      <Input
        {...field}
        {...props}
        id={inputId}
        status={isError ? 'error' : ''}
      />
      {isError ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};
