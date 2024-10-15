import { FC } from 'react';
import items from './constants';
import { Link } from 'react-router-dom';
import styles from './menu.module.scss';
import { RightArrow } from '@/assets/constants';
import classNames from 'classnames';

interface IProductListProps {
  isBurgerProductList: boolean;
}

export const ProductList: FC<IProductListProps> = ({
  isBurgerProductList = false,
}) => {
  return (
    <div
      className={classNames({
        [styles.container]: !isBurgerProductList,
        [styles.burgerContainer]: isBurgerProductList,
      })}
    >
      <ul className={styles.burgerMenuTop}>
        {items.map((item) => (
          <li key={item.key}>
            <Link to={item.link} className={styles.burgerMenuTopItem}>
              <div className={styles.burgerMenuTopItemRight}>
                <img src={item.img} alt={item.title} />
                <p>{item.title}</p>
              </div>
              <img src={RightArrow} alt="Right Arrow" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
