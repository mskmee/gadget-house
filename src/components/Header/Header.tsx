import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from '@/hooks/hooks';
import { useMemo, useState, useCallback } from 'react';
import Search from '@/components/Header/Search/Search';
import ButtonNav from '@/components/Button/Button';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';
import CartTooltip from '@/components/CartTooltip/CartTooltip';
import { AppRoute } from '@/enums/Route';
import buttonData from '@/constants/ButtonConstants';
import { motion } from 'framer-motion';
import { CatalogIcon } from '@/assets/constants';
import { BasketIconBlack, BasketIconWhite } from '@/assets/constants';
import styles from './header.module.scss';

const iconsWithoutCard = buttonData.slice(0, -1);

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const products = useAppSelector((state) => state.cardReducer.cartItems);

  const isMaxWidth1070 = useMediaQuery({
    query: '(max-width: 1070px)',
  });

  const isShowCardDialog = useMemo(
    () => isHovered && products.length > 0 && !isMaxWidth1070,
    [isHovered, isMaxWidth1070, products.length],
  );

  const handleMouse = useCallback(
    (isEnter: boolean) => () => {
      setIsHovered(isEnter);
    },
    [],
  );

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
            ? null
            : iconsWithoutCard.map((item) => {
                return (
                  <ButtonNav
                    key={item.id}
                    icon={item.img}
                    hoverImg={item.hoverImg}
                    clickImg={item.clickImg}
                  />
                );
              })}
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
        </div>
      </div>
    </header>
  );
}
