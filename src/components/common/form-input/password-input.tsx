import { useEffect, useState } from 'react';
import { Input } from 'antd';
import { FieldInputProps } from 'formik';
import zxcvbn from 'zxcvbn';
import cn from 'classnames';

import { getStrengthPassword } from '@/utils/helpers/password';
import { ShowPassword, InvisiblePassword } from '@/assets/constants';

import styles from './form-input.module.scss';

type PasswordInputProps = {
  field: FieldInputProps<any>;
  className: string;
  id: string;
  isRegister?: boolean;
};

export const PasswordInput = ({
  field,
  className,
  id,
  isRegister,
  ...props
}: PasswordInputProps) => {
  const password = field.value || '';
  const strength = zxcvbn(password).score;
  const [showStrength, setShowStrength] = useState(false);

  useEffect(() => {
    if (isRegister && password) {
      setShowStrength(true);
    } else {
      setShowStrength(false);
    }
  }, [password, isRegister]);

  return (
    <>
      <Input.Password
        {...field}
        {...props}
        id={id}
        className={className}
        iconRender={(visible) =>
          visible ? (
            <img
              src={ShowPassword}
              alt="Show password icon"
              width={20}
              height={20}
            />
          ) : (
            <img
              src={InvisiblePassword}
              alt="Hide password icon"
              width={20}
              height={20}
            />
          )
        }
      />
      {showStrength && (
        <p
          className={cn(
            styles.formInput__passwordStrength,
            [
              styles.formInput__passwordStrength_weak,
              styles.formInput__passwordStrength_medium,
              styles.formInput__passwordStrength_strong,
              styles.formInput__passwordStrength_veryStrong,
            ][strength] || styles.formInput__passwordStrength_weak,
          )}
        >
          {getStrengthPassword(strength)}
        </p>
      )}
    </>
  );
};
