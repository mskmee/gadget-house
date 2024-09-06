import styles from './header.module.scss';
import { BurgerMenuIcon, CatalogIcon, Vector } from '@/assets/constants';
import Search from './Search/Search';
import ButtonNav from '../Button/Button';
import buttonData from '@/constants/ButtonConstants';
import { useMediaQuery } from 'react-responsive';
import { AppRoute } from '@/enums/Route';
import { Button } from 'antd';
import { useMenuContext } from '@/context/menuContext.ts';

export default function Header() {
  const isMobile = useMediaQuery({ query: '(max-width: 1070px)' });

  const { onMenuClose, onMenuOpen, isMenuOpen } = useMenuContext();
  return (
    <header>
      <div className={styles.headerTop}>
        <a href={AppRoute?.ROOT} className={styles.headerTopLogo}>
          GadgetHouse
        </a>
      </div>
      <div className={styles.headerBottom}>
        {isMobile ? (
          <>
            <Button
              style={{
                paddingLeft: '0px',
                paddingRight: '0px',
                flexBasis: '48px',
              }}
              className={styles.burgerButton}
              onClick={isMenuOpen ? onMenuClose : onMenuOpen}
              type="text"
            >
              {isMenuOpen ? (
                <img src={Vector} alt="open menu" />
              ) : (
                <img src={BurgerMenuIcon} alt="open menu" />
              )}
            </Button>
          </>
        ) : (
          <div className={styles.headerBottomCatalog}>
            <img src={CatalogIcon} alt="Catalog" />
            <h1>Catalog</h1>
          </div>
        )}
        <Search />
        <div className={styles.headerBottomButtons}>
          {isMobile
            ? buttonData.slice(3, 4).map((item) => (
                <div key={item.id} style={{ position: 'relative' }}>
                  <ButtonNav
                    icon={item.img}
                    hoverImg={item.hoverImg}
                    clickImg={item.clickImg}
                  />
                  <span className={styles.badgeCount}>999</span>
                </div>
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
