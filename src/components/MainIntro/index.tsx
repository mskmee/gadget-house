import styles from './MainIntro.module.scss';
import { ProductList } from '../BurgerMenu/ProductList';
import { mainPageIntroImg } from '@/assets/constants';

export const MainIntro = () => {
  return (
    <div className={styles['product-list']}>
      <ProductList isBurgerProductList={false} />
      <img src={mainPageIntroImg} alt="main page intro img" />
    </div>
  );
};
