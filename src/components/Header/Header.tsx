import styles from './header.module.scss';
import {
  BurgerMenuIcon,
  CatalogIcon,
  Vector,
  BasketIconBlack,
  BasketIconWhite,
} from '@/assets/constants';
import Search from './Search/Search';
import ButtonNav from '../Button/Button';
import buttonData from '@/constants/ButtonConstants';
import { useMediaQuery } from 'react-responsive';
import { AppRoute } from '@/enums/Route';
import { Button } from 'antd';
import { useMenuContext } from '@/context/menuContext.ts';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hooks';
import { useMemo, useState, useCallback } from 'react';
import CartTooltip from '@/components/CartTooltip/CartTooltip';
import { motion } from 'framer-motion';

const iconsWithoutCard = buttonData.slice(0, -1);

export default function Header() {
  const isMobile = useMediaQuery({ query: '(max-width: 1070px)' });
  const { onMenuClose, onMenuOpen, isMenuOpen } = useMenuContext();
  const [isHovered, setIsHovered] = useState(false);
  const products = useAppSelector((state) => state.cardReducer.cartItems);

  const isShowCardDialog = useMemo(
    () => isHovered && products.length > 0 && !isMobile,
    [isHovered, isMobile, products.length],
  );

  const handleMouse = useCallback(
    (isEnter: boolean) => () => {
      setIsHovered(isEnter);
    },
    [],
  );

  const handleRouteChange = () => {
    if (isMenuOpen) {
      onMenuClose();
    }
  };

  return (
    <header>
      <div className={styles.headerTop}>
        <Link
          to={AppRoute?.ROOT}
          className={styles.headerTopLogo}
          onClick={handleRouteChange}
        >
          GadgetHouse
        </Link>
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
            : iconsWithoutCard.map((item) => (
                <ButtonNav
                  key={item.id}
                  icon={item.img}
                  hoverImg={item.hoverImg}
                  clickImg={item.clickImg}
                />
              ))}
          {!isMobile && (
            <>
              <ButtonNav
                icon={BasketIconBlack}
                hoverImg={BasketIconWhite}
                clickImg={BasketIconWhite}
                onMouseEnter={handleMouse(true)}
              />
              {isShowCardDialog && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.4 }}
                  className={styles.tooltip}
                  onMouseLeave={handleMouse(false)}
                >
                  <CartTooltip />
                </motion.div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
