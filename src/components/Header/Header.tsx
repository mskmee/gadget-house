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

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CardTooltip } from '../CartTooltip/CartTooltip';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import { useMediaQuery } from 'react-responsive';
import AuthModal from '@/pages/Auth/AuthModal';
import CatalogBlock from './CatalogBlock/CatalogBlock';
import { isAuthRoute } from '@/pages/Auth/libs/utils/isAuthRoute';
import { LeftArrow } from '@/assets/constants';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const isLessThan992px = useMediaQuery({
    query: '(max-width: 992px)',
  });

  const isMobile767 = useMediaQuery({
    query: '(max-width: 767px)',
  });

  const isAuthPage = isAuthRoute(location.pathname);
  const isUserDashboardPage = location.pathname.startsWith('/dashboard/');

  const handleAuthClick = () => {
    if (isCatalogListOpen) {
      setIsCatalogListOpen(false);
      document.body.style.overflow = 'initial';
      document.body.style.paddingRight = `0px`;
    }
    if (isMobile767) {
      navigate(AppRoute.SIGN_IN);
    } else {
      setAuthModalOpen(true);
    }
  };

  const isBasketPage =
    location.pathname === AppRoute.BASKET_PAGE ||
    location.pathname === AppRoute.ORDER ||
    location.pathname === AppRoute.ORDER_SUCCESS;
  const shouldShowCartTooltip = products.length > 0 && !isBasketPage;

  useEffect(() => {
    setIsCatalogListOpen(false);
    document.body.style.overflow = 'initial';
    document.body.style.paddingRight = `0px`;
  }, [location.pathname]);
  // pop-up basket

  // open catalog
  const scrollbarWidthRef = useRef<number | null>(null);
  const fixedHeaderBlock = useRef<HTMLDivElement | null>(null);

  const getScrollbarWidth = () => {
    if (scrollbarWidthRef.current !== null) return scrollbarWidthRef.current;

    scrollbarWidthRef.current =
      window.innerWidth - document.documentElement.clientWidth;

    return scrollbarWidthRef.current;
  };

  const openCatalog = () => {
    if (isLessThan992px || (location.pathname !== '/' && !isCatalogListOpen)) {
      const scrollbarWidth = getScrollbarWidth();

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      if (isFixedHeader && scrollbarWidth > 0 && headerBottomRef.current) {
        headerBottomRef.current.style.paddingRight = `${scrollbarWidth}px`;
      }

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
      document.body.style.paddingRight = `0px`;

      if (headerBottomRef.current && isFixedHeader) {
        headerBottomRef.current.style.paddingRight = `revert-layer`;
      }
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
          ref={fixedHeaderBlock}
        >
          <div
            className={classNames({
              [styles['hidden-header-bottom-wrapper']]: !isFixedHeader,
              [styles['openn']]: isCatalogListOpen,
            })}
          >
            <div
              className={styles['catalog-section']}
              ref={catalogSectionRef}
              onMouseLeave={closeCatalog}
            >
              {(isAuthPage || isUserDashboardPage) && !isCatalogListOpen && (
                <button
                  type="button"
                  className={styles['auth-back-button']}
                  onClick={() => navigate(-1)}
                >
                  <img src={LeftArrow} alt="Back" />
                </button>
              )}

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
