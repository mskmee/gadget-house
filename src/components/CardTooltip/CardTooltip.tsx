// assets
import phoneImage from '@/assets/images/phone-image.png';
// styles
import styles from './CardTooltip.module.scss';

const mockData = [
  {
    name: 'Apple iPhone 15 Pro 256Gb Blue Titanium Apple iPhone 15 Pro 256Gb Blue Titanium',
    code: '874524',
    quantity: '1',
    price: '45999',
    href: phoneImage,
  },
  {
    name: 'Samsung Galaxy S23FE 8/128Gb Purple',
    code: '745785',
    quantity: '1',
    price: '22299',
    href: phoneImage,
  },
  {
    name: 'TWS Samsung Galaxy Buds2 Lavender',
    code: '874774',
    quantity: '1',
    price: '4299',
    href: phoneImage,
  },
  {
    name: 'TWS Samsung Galaxy Buds2 Lavender',
    code: '874774',
    quantity: '1',
    price: '4299',
    href: phoneImage,
  },
];

export default function CardTooltip() {
  return (
    <div className={styles.container}>
      <div className={styles.cardsWrapper}>
        {mockData.map(({ code, name, price, quantity, href }) => (
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
          {mockData.reduce((acc, { price }) => acc + Number(price), 0)} ₴
        </span>
        <button>Go to basket</button>
      </div>
    </div>
  );
}
