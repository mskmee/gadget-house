import { Card } from 'antd';
import { brandData } from './constants';
import styles from './card.module.css';

export default function BrandCard() {
  return (
    <>
      {brandData.map((item) => (
        <Card className={styles.cardConatiner} key={item.id}>
          <img src={item.img} className={styles.brandImg} />
        </Card>
      ))}
    </>
  );
}
