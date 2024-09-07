import cn from 'classnames';
import {
  forwardRef,
  type Ref,
  type DetailedHTMLProps,
  type PropsWithChildren,
  type ButtonHTMLAttributes,
} from 'react';
import styles from './CommonButton.module.scss';

interface ButtonProps
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    PropsWithChildren {
  ref?: Ref<HTMLButtonElement> | null;
  onClick?: () => void;
}

function CommonButton(
  { children, className, ...props }: ButtonProps,
  ref: Ref<HTMLButtonElement> | null,
) {
  return (
    <button className={cn(styles.container, className)} ref={ref} {...props}>
      {children}
    </button>
  );
}

export default forwardRef<HTMLButtonElement, ButtonProps>(CommonButton);
