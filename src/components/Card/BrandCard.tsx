import { Card } from 'antd';
import { brandData } from './constants';
import styles from './card.module.css';
import classNames from 'classnames';

export default function BrandCard() {
  return (
    <>
      {brandData.map((item) => (
        <Card
          className={classNames(
            styles.cardConatiner,
            styles.cardBrandConatiner,
          )}
          key={item.id}
        >
          <img src={item.img} className={styles.brandImg} alt="brand-images" />
        </Card>
      ))}
    </>
  );
}
