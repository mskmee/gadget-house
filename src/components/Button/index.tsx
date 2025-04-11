import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IButton } from '@/interfaces/interfaces';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './button.module.scss';
import { PopUp } from '../components';
import { EmptyBasketPopup } from '../BasketPopup/EmptyBasketPopup';
import { AppRoute } from '@/enums/Route';
import { userID } from '@/constants/ButtonConstants';

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
      return refreshToken ? (
        <Link
          to={AppRoute.USER_ACCOUNT.replace(':user-id', userID)}
          className={styles.navBtn__button}
        >
          <span className={styles.navBtn__buttonAvatar}>
            {user?.firstName?.charAt(0).toUpperCase() || 'U'}
          </span>
        </Link>
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
        <Link to={button.href} className={styles.headerButton}>
          <IconComponent />
          {favoriteProducts.length > 0 && (
            <div>
              <span>{favoriteProducts.length}</span>
            </div>
          )}
        </Link>
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
