import {
  useState,
  useRef,
  useEffect,
  type MouseEvent,
  FocusEvent,
} from 'react';
import styles from './header.module.scss';
import classNames from 'classnames';
import { CatalogIcon } from '@/assets/constants';
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
    if (location.pathname !== '/' && !isCatalogListOpen) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const headerHeight = headerRef.current && headerRef.current.clientHeight;
      const a1 = headerHeight ? headerHeight - scrollTop : 0;
      const newHeight = `${Math.floor(window.innerHeight - a1)}px`;

      if (catalogListRef.current) {
        catalogListRef.current.style.height = newHeight;
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
      if (location.pathname !== '/') {
        setIsCatalogListOpen(false);
      }
    }
  };

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
  }, [location.pathname, isFirstTime]);

  return (
    <header ref={headerRef}>
      <div id="header-top-section" className={styles.headerTop}>
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
        id="header-bottom-section"
        ref={headerBottomRef}
        className={classNames(styles.headerBottom, {
          [styles.fixedHeader]: isFixedHeader,
        })}
        tabIndex={0}
      >
        <>
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
        </>

        <Search
          searchFieldRef={searchFieldRef}
          isOverlayActive={isOverlayActive}
          setIsOverlayActive={setIsOverlayActive}
        />
        <div className={styles.headerBottomButtons}>
          {buttonData.map((buttonData) => (
            <NavButton key={buttonData.id} button={buttonData} />
          ))}

          {products?.length > 0 && (
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
      <div
        id="overlay"
        className={classNames(styles.overlay, {
          [styles.active]: isOverlayActive,
        })}
      ></div>
    </header>
  );
};
