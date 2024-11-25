import { FC } from 'react';
import styles from './benefits.module.scss';
import type { BenefitItem } from './libs/types/types';
import { BENEFIT_ITEMS } from './libs/constants/constants';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const Benefit: FC<BenefitItem> = ({ imageUri, text, imageAlt }) => {
  return (
    <Link to="#" className={styles.card}>
      <div className={styles.image}>
        <img src={imageUri} alt={imageAlt} />
      </div>
      <p className={styles.text}>{text}</p>
    </Link>
  );
};

const Benefits = () => {
  return (
    <section className={classNames(styles.wrapper)}>
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
