import { FC } from 'react';
import styles from './benefits.module.scss';
import type { BenefitItem } from './libs/types/types';
import { BENEFIT_ITEMS } from './libs/constants/constants';

const Benefit: FC<BenefitItem> = ({ imageUri, text, imageAlt }) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={imageUri} alt={imageAlt} />
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

const Benefits = () => {
  return (
    <section className={styles.wrapper}>
      {BENEFIT_ITEMS.map((item) => (
        <Benefit
          key={item.text}
          imageUri={item.imageUri}
          text={item.text}
          imageAlt={item.imageAlt}
        />
      ))}
    </section>
  );
};

export default Benefits;
