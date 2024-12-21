import styles from './MainIntro.module.scss';
import { CatalogList } from '../BurgerMenu/CatalogList';
import { mainPageIntroImg } from '@/assets/constants';
import classNames from 'classnames';

export const MainIntro = () => {
  return (
    <div className={classNames(styles['product-list'], 'container-xxl')}>
      <CatalogList isBurgerProductList={false} />
      <img src={mainPageIntroImg} alt="main page intro img" />
    </div>
  );
};
