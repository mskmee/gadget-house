import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { CloseModal } from '@/assets/constants';
import styles from './PopUp.module.scss';

type PopUpProperties = {
  isOpened: boolean;
  onClose: () => void;
  classname?: string;
  width?: number;
} & PropsWithChildren;

const PopUp: FC<PopUpProperties> = ({
  children,
  isOpened,
  onClose,
  classname = '',
  width,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (isOpened) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement;

      const timer = setTimeout(() => {
        setIsAnimating(true);

        if (closeButtonRef.current) {
          closeButtonRef.current.classList.add(styles.noFocusOutline);
          closeButtonRef.current.focus();

          setTimeout(() => {
            closeButtonRef.current?.classList.remove(styles.noFocusOutline);
          }, 300);
        }
      }, 10);

      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    } else {
      previouslyFocusedElement.current?.focus();
      setIsAnimating(false);
    }
  }, [isOpened]);

  if (!isOpened && !isAnimating) return null;

  return createPortal(
    <div
      data-test="popup-overlay"
      className={classNames(
        styles.overlay,
        { [styles.opened]: isAnimating },
        styles[classname],
      )}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={styles.content}
        style={{ maxWidth: width ? `${width}px` : undefined }}
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className={styles.close}
          aria-label="Close modal"
        >
          <CloseModal />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('root') as HTMLElement,
  );
};

export { PopUp };
