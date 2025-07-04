import { useMediaQuery } from "react-responsive";
import { BurgerMenuIcon, CatalogIcon, LeftArrow } from '@/assets/constants';
import React from "react";
import classNames from "classnames";
import { CatalogList } from "@/components/BurgerMenu/CatalogList";
import styles from '../header.module.scss';

interface CatalogBlockProps {
  isCatalogListOpen: boolean,
  setIsCatalogListOpen: React.Dispatch<React.SetStateAction<boolean>>,
  // eslint-disable-next-line no-unused-vars
  openCatalogOnFocus?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onAuthClick?: () => void,
  openCatalog?: () => void,
  // eslint-disable-next-line no-unused-vars
  closeCatalog?: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement | KeyboardEvent | HTMLAnchorElement>) => void;
}

const CatalogBlock = ({ isCatalogListOpen, setIsCatalogListOpen, onAuthClick, openCatalogOnFocus, openCatalog, closeCatalog }: CatalogBlockProps) => {
  
  const isLessThan992px = useMediaQuery({
    query: '(max-width: 992px)',
  });
  
  const handleOpenCloseBurgerMenu = () => {
    document.body.style.overflow = 'hidden';
    setIsCatalogListOpen(prev => !prev)
  };

  return (
    <>
      {isLessThan992px ? (
        <button type="button" onClick={handleOpenCloseBurgerMenu} className={styles.catalog__hamburger}>
          <img
            src={isCatalogListOpen ? LeftArrow : BurgerMenuIcon}
            className={classNames({
              [styles['active-burger-menu']]: isCatalogListOpen,
            })}
            
          />
        </button>
      ) : (
        <button
          id="catalog-btn"
          className={classNames(styles.headerBottomCatalog, {
            [styles.headerBottomCatalog__active]: isCatalogListOpen,
          })}
          onMouseEnter={openCatalog}
          onFocus={(e) => openCatalogOnFocus?.(e)}
        >
          <img src={CatalogIcon} alt="Catalog" />
          <h1>Catalog</h1>
        </button>
      )}

      {isCatalogListOpen && (
        <div
          className={classNames(styles.catalogListWrap)}
      >
        <CatalogList
          onAuthClick={onAuthClick}
          isCatalogListOpen={isCatalogListOpen}
          closeCatalog={closeCatalog}
        />
      </div>)}
    </>
  );
};

export default CatalogBlock;