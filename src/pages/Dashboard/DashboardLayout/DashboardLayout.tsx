import { Link, Outlet, useLocation } from 'react-router-dom';
import styles from './DashboardLayout.module.scss';
import { Benefits, Carousels, SliderNav } from '@/components/components';
import { UserAvatar } from '@/components/UserAvatar';
import { BasketIcon } from '@/assets/constants';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { LogoutIcon } from '@/assets/icons/LogoutIcon';
import { NavUserIcon } from '@/assets/icons/NavUserIcon';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { HeartBlackIcon } from '@/assets/icons/HeartBlackIcon';
import { ChangeUserData } from '@/assets/icons/ChangeUserData';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export const DashboardLayout = () => {
  const { pathname } = useLocation();

  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];

    if (lastPart === 'favorites' || lastPart === 'orders') {
      setActiveSection(lastPart);
    } else {
      setActiveSection('account');
    }
  }, [pathname]);

  const favoriteProducts = useTypedSelector(
    (state) => state.products.favoriteProducts,
  );

  const handleClickAccount = () => {
    setActiveSection('account');
  };

  const handleClickOrders = () => {
    setActiveSection('orders');
  };
  const handleClickFavorites = () => {
    setActiveSection('favorites');
  };

  const userID = 'user-33212';

  return (
    <>
      <div className={styles.dashboardContainer}>
        <div>
          <header className={styles.dashboardHeader}>
            <div className={styles.dashboardUserAvatar}>
              <UserAvatar name="Kate" />
              <h2 className={styles.dashboardUserName}>Kate Carson</h2>
              <ChangeUserData />
            </div>
            <div className={styles.dashboardUserStatistics}>
              <div className={styles.userStatisticsOrders}>
                <div>
                  <BasketIcon />
                  <span>My orders</span>
                </div>
                <span>3</span>
              </div>
              <div className={styles.userStatisticsFavorites}>
                <div>
                  <HeartIcon
                    onClick={() => {}}
                    fill="#78808C"
                    width="24"
                    height="24"
                  />
                  <span>My favorites</span>
                </div>
                <span>
                  {favoriteProducts.length > 0 ? favoriteProducts.length : 0}
                </span>
              </div>
            </div>
            <button className={styles.dashboardLogout}>
              <LogoutIcon />
              <span>Exit</span>
            </button>
          </header>
          <div className={styles.dashboardContent}>
            <aside className={styles.dashboardSidebar}>
              <Link
                to={`/dashboard/${userID}`}
                className={classNames(styles.dashboardSidebarAccount, styles.dashboardSidebarLink, {
                  [styles.activeSection]: activeSection === 'account',
                })}
                onClick={handleClickAccount}
              >
                <div className={classNames(styles.dashboardSidebarIcon)}>
                  <NavUserIcon stroke="#1C1817" width="24px" height="24px" />
                </div>
                <span><span className={styles.dashboardSidebarLink__pref}>My</span> account</span>
              </Link>
              <Link
                to={`/dashboard/${userID}/orders`}
                className={classNames(styles.dashboardSidebarOrders, styles.dashboardSidebarLink, {
                  [styles.activeSection]: activeSection === 'orders',
                })}
                onClick={handleClickOrders}
              >
                <div className={classNames(styles.dashboardSidebarIcon)}>
                  <BasketIcon />
                </div>
                <span><span className={styles.dashboardSidebarLink__pref}>My</span>orders</span>
              </Link>
              <Link
                to={`/dashboard/${userID}/favorites`}
                className={classNames(styles.dashboardSidebarFavorites, styles.dashboardSidebarLink, {
                  [styles.activeSection]: activeSection === 'favorites',
                })}
                onClick={handleClickFavorites}
              >
                <div className={classNames(styles.dashboardSidebarIcon)}>
                  <HeartBlackIcon />
                </div>
                <span>
                  <span className={styles.dashboardSidebarLink__pref}>My</span> favorites{' '}
                  {favoriteProducts.length > 0 && (
                    <span className={styles.dashboardSidebarCounter}>({favoriteProducts.length})</span>
                  )}
                </span>
              </Link>
            </aside>
            {<Outlet />}
          </div>
        </div>
      </div>
      <SliderNav
        text="Recommendations for you"
        link="/smartphones"
        isVisibleSeeMoreBtn={false}
      />
      <Carousels classname="smartphone-carousel" />
      <Benefits />
    </>
  );
};
