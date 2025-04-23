import { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { dropdownBbuttonData } from '@/constants/ButtonConstants';
import { NavButton } from '../Button';
import items from './constants';
import { RightArrow } from '@/assets/constants';
import styles from './menu.module.scss';

interface IProductListProps {
  isBurgerProductList: boolean;
  setIsCatalogListOpen?: Dispatch<SetStateAction<boolean>>;
  onAuthClick?: () => void;
}

export const CatalogList: FC<IProductListProps> = ({
  isBurgerProductList = false,
  setIsCatalogListOpen,
  onAuthClick,
}) => {
  const isLaptopPage = useMediaQuery({
    query: '(max-width: 992px)',
  });

  const closeCatalogList = (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement | KeyboardEvent>,
  ) => {
    const catalogBtn = document.getElementById('catalog-btn');
    const shouldCatalogListClose =
      (!catalogBtn ||
        !(e.relatedTarget instanceof Node) ||
        !catalogBtn.contains(e.relatedTarget)) &&
      setIsCatalogListOpen;

    if (shouldCatalogListClose) {
      setIsCatalogListOpen(false);
    }
  };

  const handleCloseCatalogList = (e: any) => {
    if (!isLaptopPage) {
      closeCatalogList(e);
    }
  };

  return (
    <div
      id="catalog-list"
      className={classNames({
        [styles.container]: !isBurgerProductList,
        [styles.burgerContainer]: isBurgerProductList,
      })}
      onMouseLeave={handleCloseCatalogList}
    >
      <ul className={styles.burgerMenuTop}>
        {items.map((item) => (
          <li key={item.key}>
            <Link to={item.link} className={styles.burgerMenuTopItem}>
              <div className={styles.burgerMenuTopItemRight}>
                <img src={item.img} alt={item.title} />
                <p
                  className={classNames({
                    [styles.burgerMenuTopItemAdmin]:
                      item.title === 'Admin Page',
                    [styles.burgerMenuTopItemSale]: item.title === 'SALE',
                  })}
                >
                  {item.title}
                </p>
              </div>
              <img src={RightArrow} alt="Right Arrow" />
            </Link>
          </li>
        ))}
      </ul>
      <div className={classNames(styles.catalogListButtons)}>
        {dropdownBbuttonData.slice(0, 3).map((buttonData) => (
          <NavButton
            key={buttonData.id}
            button={buttonData}
            onAuthClick={onAuthClick}
          />
        ))}
      </div>
    </div>
  );
};
