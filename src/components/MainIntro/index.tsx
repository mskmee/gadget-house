import styles from './MainIntro.module.scss';
import { CatalogList } from '../BurgerMenu/CatalogList';
import { mainPageIntroDesktop, mainPageIntroMobile } from '@/assets/constants';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

export const MainIntro = () => {
  const isLargerThan1440px = useMediaQuery({
    query: '(min-width: 1340px)',
  });
  return (
    <div className={classNames(styles['product-list'], 'container-xxl')}>
      <CatalogList isBurgerProductList={false} />
      <img
        src={isLargerThan1440px ? mainPageIntroDesktop : mainPageIntroMobile}
        alt="main page intro img"
      />
    </div>
  );
};
