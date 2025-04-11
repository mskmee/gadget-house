import {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  FocusEvent,
} from 'react';
import styles from './header.module.scss';
import classNames from 'classnames';
import { BurgerMenuIcon, CatalogIcon, LeftArrow } from '@/assets/constants';
import { Search } from './Search/Search';
import { NavButton } from '../Button';
import { buttonData } from '@/constants/ButtonConstants';
import { motion } from 'framer-motion';
import { AppRoute } from '@/enums/Route';
import { useMenuContext } from '@/context/menuContext.ts';
import { Link, useLocation } from 'react-router-dom';
import { CatalogList } from '../BurgerMenu/CatalogList';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CardTooltip } from '../CartTooltip/CartTooltip';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import { InputRef } from 'antd';
import { useMediaQuery } from 'react-responsive';
import AuthModal from '@/pages/Auth/AuthModal';

export const Header = () => {
  const location = useLocation();
  const { onMenuClose, isMenuOpen } = useMenuContext();
  const isFixedHeader = useIsFixedHeader();
  const [isCatalogListOpen, setIsCatalogListOpen] = useState(false);
  const [isFocusedHeader, setIsFocusedHeader] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const products = useTypedSelector((state) => state.shopping_card.products);
  const searchValue = useTypedSelector((state) => state.search.searchValue);
  const catalogListRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLButtonElement>(null);
  const catalogBtnRef = useRef<HTMLButtonElement>(null);
  const fixedHeaderRef = useRef<HTMLDivElement>(null);
  const headerBottomRef = useRef<HTMLDivElement>(null);
  const headerBottomWrapRef = useRef<HTMLDivElement>(null);
  const searchFieldRef = useRef<InputRef>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    setAuthModalOpen(true);
  };

  const isLargerThan1557px = useMediaQuery({
    query: '(min-width: 1557px)',
  });
  const isLessThan1557px = useMediaQuery({
    query: '(max-width: 1557px)',
  });

  const isLargerThan1540px = useMediaQuery({
    query: '(min-width: 1540px)',
  });
  const isLargerThan1440px = useMediaQuery({
    query: '(min-width: 1440px)',
  });
  const isLessThan1440px = useMediaQuery({
    query: '(max-width: 1440px)',
  });

  const isLessThan1250px = useMediaQuery({
    query: '(max-width: 1250px)',
  });

  const isLessThan992px = useMediaQuery({
    query: '(max-width: 992px)',
  });

  const isLessThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const isBasketPage = location.pathname === AppRoute.BASKET_PAGE;
  const shouldShowCartTooltip = products.length && !isBasketPage;

  const handleRouteChange = () => {
    if (isMenuOpen) {
      onMenuClose();
    }
  };

  useEffect(() => {
    setIsCatalogListOpen(false);

    if (isFocusedHeader) {
      headerBottomRef.current?.blur();
      searchFieldRef.current?.blur();
    }
  }, [location.pathname]);

  const openCatalogList = () => {
    if (isLessThan992px || (location.pathname !== '/' && !isCatalogListOpen)) {
      const scrollTop = 0;
      const headerHeight = isFixedHeader
        ? headerBottomRef.current && headerBottomRef.current.clientHeight
        : headerRef.current && headerRef.current.clientHeight;
      const a1 = headerHeight ? headerHeight - scrollTop : 0;
      const newHeight = `${Math.floor(window.innerHeight - a1 + 1)}px`;

      const newPositionLeft = `${Math.floor(window.innerWidth - 1440 - 17) / 2}`;
      if (catalogListRef.current) {
        catalogListRef.current.style.height = newHeight;

        if (isLargerThan1557px) {
          catalogListRef.current.style.left = isFixedHeader
            ? `-${+newPositionLeft - 50}px`
            : `-${newPositionLeft}px`;
          catalogListRef.current.style.setProperty(
            '--parent-left',
            `-${newPositionLeft}px`,
          );
        } else if (isLessThan1557px && !isLessThan1440px) {
          catalogListRef.current.style.left = isFixedHeader ? '0' : '-50px';
          catalogListRef.current.style.setProperty('--parent-left', `-50px`);
        } else if (isLessThan1440px && !isLessThan1250px) {
          catalogListRef.current.style.left = isFixedHeader ? '0' : '0';
          catalogListRef.current.style.setProperty('--parent-left', `-50px`);
        } else if (isLessThan1250px && !isLessThan992px) {
          catalogListRef.current.style.left = '0';
          catalogListRef.current.style.setProperty('--parent-left', `20px`);
        } else if (isLessThan992px && !isLessThan768px) {
          catalogListRef.current.style.top = `80px`;
          catalogListRef.current.style.left = '0';
          catalogListRef.current.style.setProperty('--parent-left', '0');
        } else if (isLessThan768px) {
          catalogListRef.current.style.top = `64px`;
          catalogListRef.current.style.left = '0';
          catalogListRef.current.style.setProperty('--parent-left', `0`);
        }
      }

      setIsCatalogListOpen(true);
    }
  };

  const closeCatalogList = (
    e: MouseEvent<HTMLButtonElement | HTMLDivElement | KeyboardEvent>,
  ) => {
    const catalogList = document.getElementById('catalog-list');

    if (
      !catalogList ||
      !(e.relatedTarget instanceof Node) ||
      !catalogList.contains(e.relatedTarget)
    ) {
      setIsCatalogListOpen(false);
    }
  };

  useEffect(() => {
    if (isFixedHeader) {
      if (
        isCatalogListOpen &&
        fixedHeaderRef.current &&
        headerBottomWrapRef.current
      ) {
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = '16.8px';
        if (isLargerThan1540px) {
          fixedHeaderRef.current.style.width = `${document.documentElement.clientWidth - 16.8}px`;
        }
        if (!isLargerThan1540px && isLargerThan1440px) {
          headerBottomWrapRef.current.style.width = `${document.documentElement.clientWidth - 116.8}px`;
        }
        if (isLessThan1440px) {
          headerBottomWrapRef.current.style.width = `${document.documentElement.clientWidth - 66.8}px`;
        }
        if (isLessThan1250px) {
          headerBottomWrapRef.current.style.width = `${document.documentElement.clientWidth - 56.8}px`;
        }
      } else {
        if (fixedHeaderRef.current && headerBottomWrapRef.current) {
          document.body.style.overflowY = 'initial';
          document.body.style.paddingRight = '0px';
          headerBottomWrapRef.current.style.width = '100%';
          fixedHeaderRef.current.style.width = '100%';
        }
      }
    } else {
      if (isCatalogListOpen) {
        document.body.style.overflowY = 'hidden';
        document.body.style.paddingRight = '16.8px';
      } else {
        document.body.style.overflowY = 'initial';
        document.body.style.paddingRight = '0px';
      }
    }
  }, [isCatalogListOpen, isFixedHeader]);

  const openCatalogListOnFocus = (e: FocusEvent<HTMLButtonElement>) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        openCatalogList();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    e.currentTarget.addEventListener('focusout', () => {
      window.removeEventListener('keydown', handleKeyDown);
    });
  };

  useEffect(() => {
    if (searchValue) {
      setIsFocusedHeader(true);
      headerBottomRef.current?.focus();
      searchFieldRef.current?.focus();
    } else {
      setIsOverlayActive(false);
    }
  }, [searchValue]);

  useEffect(() => {
    const handleOverlayClick = (e: Event) => {
      if (
        e instanceof MouseEvent &&
        (e.target as HTMLElement).id === 'overlay' &&
        searchFieldRef.current
      ) {
        setIsOverlayActive(false);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.key === 'Tab' &&
        ((e.target as HTMLElement).id === 'header-search' ||
          (e.target as HTMLElement).id === 'header-logo')
      ) {
        setIsCatalogListOpen(false);
      }
    };

    window.addEventListener('click', handleOverlayClick);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('click', handleOverlayClick);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/search-results' && isFirstTime) {
      searchFieldRef.current?.focus();
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, [location.pathname /*isFirstTime*/]);

  const handleOpenCloseBurgerMenu = (e: any) => {
    if (!isCatalogListOpen) {
      openCatalogList();
    } else {
      closeCatalogList(e);
    }
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div id="header-top-section" className={classNames(styles.headerTop)}>
        <Link
          id="header-logo"
          to={AppRoute?.ROOT}
          className={styles.headerTopLogo}
          onClick={handleRouteChange}
        >
          GadgetHouse
        </Link>
      </div>
      <div
        className={classNames(styles.headerBottomWrap, {
          'container-xxl': !isFixedHeader,
          [styles.fixedHeader]: isFixedHeader,
        })}
        ref={fixedHeaderRef}
      >
        <div
          id="header-bottom-section"
          ref={headerBottomRef}
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
            ref={headerBottomWrapRef}
          >
            {isLessThan992px ? (
              <img
                src={isCatalogListOpen ? LeftArrow : BurgerMenuIcon}
                className={classNames({
                  [styles['active-burger-menu']]: isCatalogListOpen,
                })}
                onClick={handleOpenCloseBurgerMenu}
              />
            ) : (
              <button
                id="catalog-btn"
                ref={catalogBtnRef}
                className={classNames(styles.headerBottomCatalog, {
                  [styles.headerBottomCatalog__active]: isCatalogListOpen,
                })}
                onMouseEnter={openCatalogList}
                onFocus={openCatalogListOnFocus}
                onMouseLeave={closeCatalogList}
              >
                <img src={CatalogIcon} alt="Catalog" />
                <h1>Catalog</h1>
              </button>
            )}

            <div
              className={classNames(styles.catalogListWrap, {
                [styles.catalogListWrapVisible]: isCatalogListOpen,
              })}
              ref={catalogListRef}
            >
              <CatalogList
                isBurgerProductList={false}
                setIsCatalogListOpen={setIsCatalogListOpen}
              />
            </div>
            <Search
              searchFieldRef={searchFieldRef}
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

              {shouldShowCartTooltip !== 0 &&
                location.pathname !== AppRoute.BASKET_PAGE && (
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
      <div
        id="overlay"
        className={classNames(styles.overlay, {
          [styles.active]: isOverlayActive,
        })}
      ></div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </header>
  );
};
