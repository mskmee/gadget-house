import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IButton } from '@/interfaces/interfaces';
import { useTypedSelector } from '@/hooks/useTypedSelector';

import styles from './button.module.scss';

interface INavButtonProps {
  button: IButton;
  onAuthClick: () => void;
}

export const NavButton: FC<INavButtonProps> = ({ button, onAuthClick }) => {
  const IconComponent = button.img;
  const products = useTypedSelector((state) => state.shopping_card.products);
  const productsLength = products.reduce((acc, item) => acc + item.quantity, 0);

  return button.href === '/sign-in' ? (
    <button onClick={onAuthClick} className={styles.navBtn__button}>
      <IconComponent />
    </button>
  ) : (
    <Link to={button.href}>
      <IconComponent />
      {button.href === '/basket' && products?.length > 0 && (
        <div>
          <span> {productsLength}</span>
        </div>
      )}
    </Link>
  );
};
