// hooks
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// components
import Search from '@/components/Header/Search/Search';
import ButtonNav from '@/components/Button/Button';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';
import CardTooltip from '@/components/CardTooltip/CardTooltip';
import { Link } from 'react-router-dom';
// constants
import { AppRoute } from '@/enums/Route';
import buttonData from '@/constants/ButtonConstants';
// assets
import { CatalogIcon } from '@/assets/constants';
import { BasketIconBlack, BasketIconWhite } from '@/assets/constants';
// styles
import styles from './header.module.scss';

const iconsWithoutCard = buttonData.slice(0, -1);

export default function Header() {
  const isMaxWidth1070 = useMediaQuery({
    query: '(max-width: 1070px)',
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleMouse = (isEnter: boolean) => {
    setIsHovered(isEnter);
  };

  return (
    <>
      <div className={styles.headerTop}>
        <Link to={AppRoute?.ROOT} className={styles.headerTopLogo}>
          GadgetHouse
        </Link>
      </div>
      <div className={styles.headerBottom}>
        {!isMaxWidth1070 && (
          <div className={styles.headerBottomCatalog}>
            <img src={CatalogIcon} />
            <h1>Catalog</h1>
          </div>
        )}
        {isMaxWidth1070 && <BurgerMenu />}
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
            onMouseEnter={() => handleMouse(true)}
          />
          {isHovered && (
            <div
              className={styles.tooltip}
              onMouseLeave={() => handleMouse(false)}
            >
              <CardTooltip />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
