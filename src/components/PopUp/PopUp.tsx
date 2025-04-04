import { FC, PropsWithChildren } from 'react';
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
  return createPortal(
    <div
      className={classNames(
        styles.overlay,
        { [styles.opened]: isOpened },
        styles[classname],
      )}
      onClick={onClose}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
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
