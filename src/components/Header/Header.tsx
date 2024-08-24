import React from 'react';
import styles from './header.module.scss';
import { CatalogIcon } from '@/assets/constants';
import Search from './Search/Search';
import ButtonNav from '../Button/Button';
import buttonData from '@/constants/ButtonConstants';
import { useMediaQuery } from 'react-responsive';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { AppRoute } from '@/enums/Route';

export default function Header() {
  const isMaxWidth1070 = useMediaQuery({ query: '(max-width: 1070px)' });

  return (
    <header>
      <div className={styles.headerTop}>
        <a href={AppRoute?.ROOT} className={styles.headerTopLogo}>
          GadgetHouse
        </a>
      </div>
      <div className={styles.headerBottom}>
        {!isMaxWidth1070 ? (
          <div className={styles.headerBottomCatalog}>
            <img src={CatalogIcon} alt="Catalog" />
            <h1>Catalog</h1>
          </div>
        ) : (
          <BurgerMenu />
        )}
        <Search />
        <div className={styles.headerBottomButtons}>
          {isMaxWidth1070
            ? buttonData
                .slice(3, 4)
                .map((item) => (
                  <ButtonNav
                    key={item.id}
                    icon={item.img}
                    hoverImg={item.hoverImg}
                    clickImg={item.clickImg}
                  />
                ))
            : buttonData.map((item) => (
                <ButtonNav
                  key={item.id}
                  icon={item.img}
                  hoverImg={item.hoverImg}
                  clickImg={item.clickImg}
                />
              ))}
        </div>
      </div>
    </header>
  );
}
