import { memo, useMemo, type FC } from 'react';
import CartIcon from '@/components/CartIcon/CartIcon';
import LikeIcon from '@/components/LikeIcon/LikeIcon';
import { Card, Rate, Button } from 'antd';
import cn from 'classnames';
import type { Phone } from '@/types/generateFakeData.types';
import styles from './ProductCard.module.scss';

const ProductCard: FC<Phone> = memo(function ProductCard({
  code,
  href,
  name,
  price,
  rating,
  characteristics,
}) {
  const colors = useMemo(
    () => (
      <>
        {characteristics.colors.length ? (
          <ul className={styles.colors}>
            {characteristics.colors.map((color) => (
              <li key={color} className={cn(styles.circle, styles[color])} />
            ))}
          </ul>
        ) : null}
      </>
    ),
    [characteristics.colors],
  );

  return (
    <Card className={styles.container} cover={<img alt={name} src={href} />}>
      <Button type="link" icon={<LikeIcon />} className={styles.likeButton} />
      {colors}
      <h3>{name}</h3>
      <div className={styles.additionalInfo}>
        <Rate disabled defaultValue={rating} className={styles.rate} />
        <span className={styles.code}>code:{code}</span>
      </div>
      <div className={styles.mainInfo}>
        <em>{price} ₴</em>
        <Button icon={<CartIcon />} />
      </div>
    </Card>
  );
});

export default ProductCard;
