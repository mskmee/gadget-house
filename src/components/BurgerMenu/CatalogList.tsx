import { Dispatch, FC, MouseEvent, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import items from './constants';
import { RightArrow } from '@/assets/constants';

import styles from './menu.module.scss';

interface IProductListProps {
  isBurgerProductList: boolean;
  setIsCatalogListOpen?: Dispatch<SetStateAction<boolean>>;
}

export const CatalogList: FC<IProductListProps> = ({
  isBurgerProductList = false,
  setIsCatalogListOpen,
}) => {
  const closeCatalogList = (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement | KeyboardEvent>,
  ) => {
    const catalogBtn = document.getElementById('catalog-btn');

    if (
      !catalogBtn ||
      !(e.relatedTarget instanceof Node) ||
      !catalogBtn.contains(e.relatedTarget)
    ) {
      if (location.pathname !== '/' && setIsCatalogListOpen) {
        setIsCatalogListOpen(false);
      }
    }
  };

  return (
    <div
      id="catalog-list"
      className={classNames({
        [styles.container]: !isBurgerProductList,
        [styles.burgerContainer]: isBurgerProductList,
      })}
      onMouseLeave={closeCatalogList}
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
    </div>
  );
};
