import { useField, FormikValues } from 'formik';
import { Input, InputProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { useId, useState } from 'react';
import cn from 'classnames';
import zxcvbn from 'zxcvbn';

import { ErrorIcon, ShowPassword, InvisiblePassword } from '@/assets/constants';

import styles from './form-input.module.scss';
import { getStrengthPassword } from '@/utils/helpers/password';

type InputType = 'input' | 'textarea';

type Properties<T extends FormikValues> = Omit<InputProps, 'name'> &
  Partial<TextAreaProps> & {
    inputType?: InputType;
    name: keyof T;
    label?: string;
    span?: string;
  };

export const FormInput = <T extends FormikValues>({
  inputType = 'input',
  label,
  name,
  span,
  type = 'text',
  ...props
}: Properties<T>) => {
  const [field, meta] = useField(name as string);
  const id = useId();
  const inputId = props.id ?? id;
  const isError = meta.touched && meta.error;

  const password = field.value || '';
  const strength = zxcvbn(password).score;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

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
            {inputType === 'input' ? (
              <>
                <Input
                  {...field}
                  {...(props as InputProps)}
                  id={inputId}
                  type={
                    type === 'password'
                      ? isPasswordVisible
                        ? 'text'
                        : 'password'
                      : type
                  }
                  status={isError ? 'error' : ''}
                />
                {type === 'password' && (
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.formInput__passwordToggle}
                  >
                    {isPasswordVisible ? (
                      <img src={ShowPassword} alt="Show password icon" />
                    ) : (
                      <img
                        src={InvisiblePassword}
                        alt="Invisible password icon"
                      />
                    )}
                  </button>
                )}

                {type === 'password' && password && (
                  <p
                    className={cn(
                      styles.formInput__passwordStrength,
                      strength === 0
                        ? styles.formInput__passwordStrength_weak
                        : strength === 1
                          ? styles.formInput__passwordStrength_weak
                          : strength === 2
                            ? styles.formInput__passwordStrength_medium
                            : strength === 3
                              ? styles.formInput__passwordStrength_strong
                              : styles.formInput__passwordStrength_veryStrong,
                    )}
                  >
                    {getStrengthPassword(strength)}
                  </p>
                )}
              </>
            ) : (
              <Input.TextArea
                {...field}
                {...(props as TextAreaProps)}
                id={inputId}
                maxLength={1000}
                status={isError ? 'error' : ''}
              />
            )}
            {isError ? (
              <div className={styles.formInput__error}>
                <img src={ErrorIcon} alt="Error icon" />
                {meta.error}
              </div>
            ) : null}

            <span className={styles.formInput__label}>{label}</span>
          </label>
        )
      )}
    </>
  );
};
