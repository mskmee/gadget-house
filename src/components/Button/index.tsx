import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { IButton } from '@/interfaces/interfaces';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './button.module.scss';
import { PopUp } from '../components';
import { EmptyBasketPopup } from '../BasketPopup/EmptyBasketPopup';

interface INavButtonProps {
  button: IButton;
  onAuthClick?: () => void;
}

export const NavButton: FC<INavButtonProps> = ({ button, onAuthClick }) => {
  const IconComponent = button.img;
  const products = useTypedSelector((state) => state.shopping_card.products);
  const productsLength = products.reduce((acc, item) => acc + item.quantity, 0);

  const [isEmptyBasketPopupOpen, setIsEmptyBasketPopupOpen] = useState(false);

  const openEmptyBasketPopup = () => {
    setIsEmptyBasketPopupOpen(true);
  };

  const closeEmptyBasketPopup = () => {
    setIsEmptyBasketPopupOpen(false);
  };
  return (
    <>
      {button.href === '/sign-in' ? (
        <button onClick={onAuthClick} className={styles.navBtn__button}>
          <IconComponent />
        </button>
      ) : products?.length > 0 ? (
        <Link to={button.href}>
          <IconComponent />
          {button.href === '/basket' && (
            <div>
              <span>{productsLength}</span>
            </div>
          )}
        </Link>
      ) : button.href === '/basket' ? (
        <button className={styles.headerButton} onClick={openEmptyBasketPopup}>
          <IconComponent />
        </button>
      ) : (
        <Link to={button.href}>
          <IconComponent />
        </Link>
      )}
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
