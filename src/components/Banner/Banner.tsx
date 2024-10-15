import { Link } from 'react-router-dom';
import styles from './banner.module.scss';
import items from '../BurgerMenu/constants';
import { RightArrow } from '@/assets/constants';

export default function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContainerLeft}>
        <ul>
          {items.map((item) => (
            <Link
              key={item.key}
              to={item.link}
              className={styles.bannerContainerLeftItem}
            >
              <div className={styles.bannerContainerLeftItemRight}>
                <img src={item.img} />
                <p>{item.title}</p>
              </div>
              <img src={RightArrow} />
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.bannerContainerRight}>Right</div>
    </div>
  );
}
