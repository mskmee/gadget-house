import { FC, PropsWithChildren } from 'react';
import styles from './PopUp.module.scss';
import classNames from 'classnames';
import { createPortal } from 'react-dom';

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
          X
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('root') as HTMLElement,
  );
};

export { PopUp };
