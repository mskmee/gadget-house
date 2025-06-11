import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { IButton } from '@/interfaces/interfaces';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { getUserInitials } from '@/utils/helpers/getUserInitials';
import { PopUp } from '../components';
import { EmptyBasketPopup } from '../BasketPopup/EmptyBasketPopup';

import styles from './button.module.scss';

interface INavButtonProps {
  button: IButton;
  onAuthClick?: () => void;
}

export const NavButton: FC<INavButtonProps> = ({ button, onAuthClick }) => {
  const IconComponent = button.img;
  const products = useTypedSelector((state) => state.shopping_card.products);
  const user = useTypedSelector((state) => state.auth.user);
  const refreshToken = localStorage.getItem('refresh_token');
  const productsLength = products.reduce((acc, item) => acc + item.quantity, 0);

  const favoriteProducts = useTypedSelector(
    (state) => state.products.favoriteProducts,
  );

  const [isEmptyBasketPopupOpen, setIsEmptyBasketPopupOpen] = useState(false);

  const openEmptyBasketPopup = () => setIsEmptyBasketPopupOpen(true);
  const closeEmptyBasketPopup = () => setIsEmptyBasketPopupOpen(false);

  const renderButton = () => {
    if (button.href === '/sign-in') {
      if (refreshToken && user?.id) {
        return (
          <Link to={`/dashboard/${user.id}`} className={styles.headerButton}>
            <span className={styles.navBtn__buttonAvatar}>
              {getUserInitials(user?.fullName || '')}
            </span>
          </Link>
        );
      }
      return refreshToken ? (
        <button className={styles.navBtn__button} onClick={onAuthClick}>
          <span className={styles.navBtn__buttonAvatar}>
            {getUserInitials(user?.fullName || '')}
          </span>
        </button>
      ) : (
        <button onClick={onAuthClick} className={styles.navBtn__button}>
          <IconComponent />
        </button>
      );
    }

    if (
      button.href.startsWith('/dashboard/') &&
      button.href.endsWith('/favorites')
    ) {
      return (
        <>
          {refreshToken && user?.id ? (
            <Link to={button.href} className={styles.headerButton}>
              <IconComponent />
              {favoriteProducts.length > 0 && (
                <div>
                  <span>{favoriteProducts.length}</span>
                </div>
              )}
            </Link>
          ) : (
            <button onClick={onAuthClick} className={styles.headerButton}>
              <IconComponent />
            </button>
          )}
        </>
      );
    }

    if (button.href === '/basket') {
      return products.length > 0 ? (
        <Link to={button.href} className={styles.headerButton}>
          <IconComponent />
          <div>
            <span>{productsLength}</span>
          </div>
        </Link>
      ) : (
        // ???? LINK || <a> works but not <button>
        <button className={styles.headerButton} onClick={openEmptyBasketPopup}>
          <IconComponent />
        </button>
      );
    }

    return (
      <Link to={button.href} className={styles.headerButton}>
        <IconComponent />
      </Link>
    );
  };

  return (
    <>
      {renderButton()}
      <PopUp
        isOpened={isEmptyBasketPopupOpen}
        onClose={closeEmptyBasketPopup}
        classname="basket-modal"
      >
        <EmptyBasketPopup closeEmptyBasketPopup={closeEmptyBasketPopup} />
      </PopUp>
    </>
  );
};
