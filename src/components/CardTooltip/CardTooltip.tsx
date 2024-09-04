// hooks
import { useAppSelector } from '@/hooks/reduxCustomHooks';
// styles
import styles from './CardTooltip.module.scss';

export default function CardTooltip() {
  const products = useAppSelector((state) => state.cardReducer) ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {products?.map(({ code, name, price, quantity, href }) => (
          <div key={code} className={styles.card}>
            <img src={href} alt={name} width="100" height="112" />
            <div>
              <div className={styles.nameWrapper}>
                <span className={styles.name}>{name}</span>
                <span className={styles.details}>code:{code}</span>
              </div>
              <div className={styles.priceWrapper}>
                <span className={styles.details}>{quantity} piece</span>
                <span className={styles.price}>{price} ₴</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.total}>
        <span className={styles.price}>
          {products.reduce((acc, { price }) => acc + Number(price), 0)} ₴
        </span>
        <button>Go to basket</button>
      </div>
    </div>
  );
}
