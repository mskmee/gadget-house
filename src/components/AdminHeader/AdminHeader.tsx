import {
  useState,
  useRef,
  FocusEvent,
  MouseEvent,
  useLayoutEffect,
  useEffect,
} from 'react';
import styles from '../Header/header.module.scss';
import classNames from 'classnames';

import { AppRoute } from '@/enums/Route';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useIsFixedHeader } from '@/hooks/useIsFixedHeader';
import { useMediaQuery } from 'react-responsive';
import CatalogBlock from '../Header/CatalogBlock/CatalogBlock';
import { isAuthRoute } from '@/pages/Auth/libs/utils/isAuthRoute';
import { LeftArrow } from '@/assets/constants';
import { NavButton } from './NavButton/NavButton';
import { ExitIcon } from '@/assets/icons';
import { DashboardButton } from './components/DashboardButton';

export const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFixedHeader = useIsFixedHeader();

  const [isCatalogListOpen, setIsCatalogListOpen] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);

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
    }
  };

  useEffect(() => {
    setIsCatalogListOpen(false);
    document.body.style.overflow = 'initial';
    document.body.style.paddingRight = `0px`;
  }, [location.pathname]);

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
            <div className={styles.headerBottomButtons}>
              <DashboardButton />
              <NavButton className={styles.navbutton} href="/logout">
                <ExitIcon />
                <span>Exit</span>
              </NavButton>
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
    </header>
  );
};
