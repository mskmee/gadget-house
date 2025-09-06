import { useId } from 'react';
import { useField, FormikValues } from 'formik';
import { Input, InputProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import cn from 'classnames';

import { PasswordInput } from './password-input';
import { PhoneInput } from './phone-input';
import { ErrorIcon } from '@/assets/constants';

import styles from './form-input.module.scss';
import { INPUT_MAX_LENGTH } from './constants';

type InputType = 'input' | 'textarea';

type Properties<T extends FormikValues> = Omit<InputProps, 'name'> &
  Partial<TextAreaProps> & {
    inputType?: InputType;
    name: keyof T;
    label?: string;
    span?: string;
    isRegister?: boolean;
    hideError?: boolean;
    showGeneralError?: boolean;
  };

export const FormInput = <T extends FormikValues>({
  inputType = 'input',
  label,
  name,
  span,
  type = 'text',
  isRegister,
  hideError = false,
  showGeneralError = false,
  ...props
}: Properties<T>) => {
  const [field, meta] = useField(name as string);
  const id = useId();
  const inputId = props.id ?? id;
  const isError = meta.touched && meta.error;
  const shouldShowErrorBorder = isError || showGeneralError;
  const leftCharactersCount = INPUT_MAX_LENGTH - (field?.value?.length || 0);

  return (
    <>
      {span ? (
        <label className={styles.formInput__radio}>
          <Input
            {...field}
            {...props}
            id={inputId}
            status={shouldShowErrorBorder ? 'error' : ''}
          />
          {span && <span>{span}</span>}
        </label>
      ) : (
        label && (
          <label className={cn(styles.formInput__input)} htmlFor={inputId}>
            {inputType === 'input' ? (
              type === 'password' ? (
                <PasswordInput
                  className={styles.formInput__inputPassword}
                  field={field}
                  id={inputId}
                  isRegister={isRegister}
                  error={shouldShowErrorBorder ? 'error' : ''}
                  {...props}
                />
              ) : type === 'tel' ? (
                <PhoneInput field={field} id={inputId} {...props} />
              ) : (
                <Input
                  {...field}
                  {...(props as InputProps)}
                  id={inputId}
                  status={shouldShowErrorBorder ? 'error' : ''}
                />
              )
            ) : (
              <>
                <Input.TextArea
                  {...field}
                  {...(props as TextAreaProps)}
                  id={inputId}
                  status={shouldShowErrorBorder ? 'error' : ''}
                  maxLength={INPUT_MAX_LENGTH}
                />
                <span
                  className={cn(styles.formInput__counter, {
                    [styles.formInput__counterError]: leftCharactersCount < 10,
                  })}
                >
                  {leftCharactersCount >= 0 ? leftCharactersCount : null}
                </span>
              </>
            )}
            {isError && !hideError ? (
              <div className={styles.formInput__error}>
                <img src={ErrorIcon} alt="Error icon" />
                {meta.error}
              </div>
            ) : null}
            {type === 'tel' ? (
              ''
            ) : (
              <span className={styles.formInput__label}>{label}</span>
            )}
          </label>
        )
      )}
    </>
  );
};
