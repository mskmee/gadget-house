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
  const headerBottomRef = useRef<HTMLDivElement>(null);
  const searchFieldRef = useRef<InputRef>(null);

  const isLargerThan1250px = useMediaQuery({
    query: '(max-width: 1250px)',
  });

  const isLaptopPage = useMediaQuery({
    query: '(max-width: 992px)',
  });

  const isLargerThan768px = useMediaQuery({
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
    if (isLaptopPage || (location.pathname !== '/' && !isCatalogListOpen)) {
      const scrollTop = 0;
      const headerHeight = headerRef.current && headerRef.current.clientHeight;
      const a1 = headerHeight ? headerHeight - scrollTop : 0;
      const newHeight = `${Math.floor(window.innerHeight - a1)}px`;

      const newPositionLeft = `${Math.floor(window.innerWidth - 1440) / 2}`;
      if (catalogListRef.current) {
        catalogListRef.current.style.height = newHeight;

        if (+newPositionLeft > 50) {
          catalogListRef.current.style.left = `-${newPositionLeft}px`;
          catalogListRef.current.style.setProperty(
            '--parent-left',
            `${newPositionLeft}px`,
          );
        } else {
          if (!isLaptopPage) {
            catalogListRef.current.style.left = isLargerThan1250px
              ? `-37px`
              : `-51px`;
            catalogListRef.current.style.setProperty('--parent-left', `50px`);
          } else {
            catalogListRef.current.style.left = `-20px`;
            catalogListRef.current.style.top = isLargerThan768px
              ? isFixedHeader
                ? `58px`
                : `66px`
              : isFixedHeader
                ? `68px`
                : `85px`;
            catalogListRef.current.style.setProperty('--parent-left', `0`);
          }
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
    if (isCatalogListOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'initial';
    }
  }, [isCatalogListOpen]);

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
    <header ref={headerRef}>
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
      >
        <div
          id="header-bottom-section"
          ref={headerBottomRef}
          className={classNames(styles.headerBottom)}
          tabIndex={0}
        >
          <div
            className={classNames({
              [styles['hidden-header-bottom-wrapper']]: !isFixedHeader,
            })}
          >
            {isLaptopPage ? (
              <img
                src={isCatalogListOpen ? LeftArrow : BurgerMenuIcon}
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
                <NavButton key={buttonData.id} button={buttonData} />
              ))}

              {shouldShowCartTooltip !== 0 && (
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
    </header>
  );
};
