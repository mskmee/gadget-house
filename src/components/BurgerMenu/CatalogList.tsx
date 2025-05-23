import React, { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { dropdownBbuttonData } from '@/constants/ButtonConstants';
import { NavButton } from '../Button';
import items from './constants';
import { RightArrow } from '@/assets/constants';
import styles from './menu.module.scss';

interface IProductListProps {
  onAuthClick?: () => void;
  isCatalogListOpen?: boolean;
  // eslint-disable-next-line no-unused-vars
  closeCatalog?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | KeyboardEvent | HTMLAnchorElement>) => void;
}

export const CatalogList: FC<IProductListProps> = ({
  onAuthClick,
  isCatalogListOpen,
  closeCatalog
}) => {

const refCatalogWrap = useRef<HTMLDivElement | null>(null);

const isWidth991 = useMediaQuery({
  query: '(max-width: 991px)',
});

useEffect(() => {
  function handleCatalogHeight() {
    const headerHeight = document.querySelector('header')?.clientHeight || 0;
    const windowHeight = window.innerHeight;
    
    const catalogListHeight = windowHeight - headerHeight;
    if (refCatalogWrap.current) {
      refCatalogWrap.current.style.maxHeight = `${catalogListHeight}px`;
      refCatalogWrap.current.style.overflowY = 'auto';
    }
  }

  if (isCatalogListOpen) {
    handleCatalogHeight();
    window.addEventListener('resize', handleCatalogHeight);
  }

  return () => {
    window.removeEventListener('resize', handleCatalogHeight);
  };
}, [isCatalogListOpen])

return (
  <div
    ref={refCatalogWrap}
    id="catalog-list"
    className={styles.container}
  >
    <ul className={styles.burgerMenuTop}>
      {items.map((item) => (
        <li key={item.key}>
          <Link to={item.link} className={styles.burgerMenuTopItem} onClick={(e) => closeCatalog?.(e)}>
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

      {isWidth991 && (
        <li className={classNames(styles.catalogListButtons)}>
          {dropdownBbuttonData.slice(0, 3).map((buttonData) => (
            <NavButton
              key={buttonData.id}
              button={buttonData}
              onAuthClick={onAuthClick}
            />
          ))}
        </li>
      )}
    </ul>
  </div>
);
};
