import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IButton } from '@/interfaces/interfaces';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface INavButtonProps {
  button: IButton;
}

export const NavButton: FC<INavButtonProps> = ({ button }) => {
  const IconComponent = button.img;
  const products = useTypedSelector((state) => state.shopping_card.products);

  return (
    <Link to={button.href}>
      <IconComponent />
      {button.href === '/basket' && products?.length > 0 && (
        <div>
          <span> {products?.length}</span>
        </div>
      )}
    </Link>
  );
};
