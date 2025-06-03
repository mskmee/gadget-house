import {
  useState,
  useRef,
  FocusEvent,
  MouseEvent,
  useLayoutEffect,
  useEffect,
} from 'react';
import styles from './header.module.scss';
import classNames from 'classnames';

import { Search } from './Search/Search';
import { NavButton } from '../Button';
import { buttonData } from '@/constants/ButtonConstants';
import { motion } from 'framer-motion';
import { AppRoute } from '@/enums/Route';

import { Link, useLocation } from 'react-router-dom';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CardTooltip } from '../CartTooltip/CartTooltip';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import { useMediaQuery } from 'react-responsive';
import AuthModal from '@/pages/Auth/AuthModal';
import CatalogBlock from './CatalogBlock/CatalogBlock';

export const Header = () => {
  const location = useLocation();
  const isFixedHeader = useIsFixedHeader();

  const [isCatalogListOpen, setIsCatalogListOpen] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const products = useTypedSelector((state) => state.shopping_card.products);
  const searchValue = useTypedSelector((state) => state.search.searchValue);
  const isGlobalOverlayActive = useTypedSelector(
    (state) => state.search.isGlobalOverlayActive,
  );

  const headerRef = useRef<HTMLButtonElement | null>(null);
  const headerBottomRef = useRef<HTMLDivElement | null>(null);
  const OverlayRef = useRef<HTMLDivElement | null>(null);
  const catalogSectionRef = useRef<HTMLDivElement | null>(null);

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  const isLessThan992px = useMediaQuery({
    query: '(max-width: 992px)',
  });

  // pop-up basket
  const isBasketPage =
    location.pathname === AppRoute.BASKET_PAGE ||
    location.pathname === AppRoute.ORDER ||
    location.pathname === AppRoute.ORDER_SUCCESS;
  const shouldShowCartTooltip = products.length > 0 && !isBasketPage;

  // open catalog
  const openCatalog = () => {
    if (isLessThan992px || (location.pathname !== '/' && !isCatalogListOpen)) {
      document.body.style.overflow = 'hidden';
      setIsCatalogListOpen(true);
    }
  };

  const closeCatalog = (
    e: MouseEvent<
      HTMLButtonElement | HTMLDivElement | KeyboardEvent | HTMLAnchorElement
    >,
  ) => {
    const catalogSection = catalogSectionRef.current;

    if (
      !catalogSection ||
      !(e.relatedTarget instanceof Node) ||
      !catalogSection.contains(e.relatedTarget)
    ) {
      document.body.style.overflow = 'initial';
      setIsCatalogListOpen(false);
    }
  };

  // open Catalog by Tab button
  const openCatalogOnFocus = (e: FocusEvent<HTMLButtonElement>) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        openCatalog();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    e.currentTarget.addEventListener('focusout', () => {
      window.removeEventListener('keydown', handleKeyDown);
    });
  };

  // test
  useEffect(() => {
    if (searchValue && isGlobalOverlayActive) {
      setIsOverlayActive(true);
    } else {
      setIsOverlayActive(false);
    }
  }, [searchValue, isGlobalOverlayActive]);

  // add position top for overlay
  useLayoutEffect(() => {
    const header = headerRef.current;
    const overlay = OverlayRef.current;
    const headerBottom = headerBottomRef.current;

    if (!overlay) return;

    let top = 0;

    if (isFixedHeader && headerBottom) {
      top = headerBottom.getBoundingClientRect().bottom;
    } else if (header) {
      top = header.getBoundingClientRect().bottom;
    }

    overlay.style.top = `${top}px`;
  }, [isCatalogListOpen, isOverlayActive, isFixedHeader]);

  return (
    <header ref={headerRef}>
      <div id="header-top-section" className={classNames(styles.headerTop)}>
        <Link
          id="header-logo"
          to={AppRoute?.ROOT}
          className={styles.headerTopLogo}
        >
          GadgetHouse
        </Link>
      </div>
      <div
        ref={headerBottomRef}
        className={classNames(styles.headerBottomWrap, {
          'container-xxl': !isFixedHeader,
          [styles.fixedHeader]: isFixedHeader,
        })}
      >
        <div
          id="header-bottom-section"
          className={classNames(styles.headerBottom, {
            [styles.headerBottomWithoutBG]: isFixedHeader,
          })}
          tabIndex={0}
        >
          <div
            className={classNames({
              [styles['hidden-header-bottom-wrapper']]: !isFixedHeader,
              [styles['openn']]: isCatalogListOpen,
            })}
          >
            <div
              className="catalog-section"
              ref={catalogSectionRef}
              onMouseLeave={closeCatalog}
            >
              <CatalogBlock
                isCatalogListOpen={isCatalogListOpen}
                setIsCatalogListOpen={setIsCatalogListOpen}
                openCatalogOnFocus={openCatalogOnFocus}
                openCatalog={openCatalog}
                onAuthClick={handleAuthClick}
                closeCatalog={closeCatalog}
              />
            </div>

            <Search
              isOverlayActive={isOverlayActive}
              setIsOverlayActive={setIsOverlayActive}
            />
            <div className={styles.headerBottomButtons}>
              {buttonData.map((buttonData) => (
                <NavButton
                  key={buttonData.id}
                  button={buttonData}
                  onAuthClick={handleAuthClick}
                />
              ))}

              {shouldShowCartTooltip && !isLessThan992px && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.4 }}
                  className={classNames(styles.tooltip, 'oo')}
                >
                  <CardTooltip />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {(isCatalogListOpen || isOverlayActive) && (
        <div
          id="overlay"
          ref={OverlayRef}
          className={classNames(styles.overlay, {
            [styles.active]: isOverlayActive || isCatalogListOpen,
          })}
        ></div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
};
