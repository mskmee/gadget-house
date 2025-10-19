import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import { CloseModal } from '@/assets/constants';

import styles from './PopUp.module.scss';

type PopUpProperties = {
  isOpened: boolean;
  onClose: () => void;
  classname: string;
} & PropsWithChildren;

const PopUp: FC<PopUpProperties> = ({
  children,
  isOpened,
  onClose,
  classname = '',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpened) {
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
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
    >
      <div className={styles.content}>
        <button onClick={onClose} className={styles.close}>
          <CloseModal />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('root') as HTMLElement,
  );
};

export { PopUp };
