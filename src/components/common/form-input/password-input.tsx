import { Input } from 'antd';
import { FieldInputProps } from 'formik';
import cn from 'classnames';
import zxcvbn from 'zxcvbn';

import { getStrengthPassword } from '@/utils/helpers/password';
import { InvisiblePassword, ShowPassword } from '@/assets/constants';

import styles from './form-input.module.scss';

type PasswordInputProps = {
  field: FieldInputProps<any>;
  className: string;
  id: string;
};

export const PasswordInput = ({
  field,
  className,
  id,
  ...props
}: PasswordInputProps) => {
  const password = field.value || '';
  const strength = zxcvbn(password).score;

  return (
    <>
      <Input.Password
        {...field}
        {...props}
        id={id}
        className={className}
        iconRender={(visible) =>
          visible ? <ShowPassword /> : <InvisiblePassword />
        }
      />
      {password && (
        <p
          className={cn(
            styles.formInput__passwordStrength,
            styles[`formInput__passwordStrength_${strength}`],
          )}
        >
          {getStrengthPassword(strength)}
        </p>
      )}
    </>
  );
};
