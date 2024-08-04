import { Card } from 'antd';
import React from 'react';
import { brandData } from './constants';
import styles from './card.module.css';

export default function BrandCard() {
  return (
    <>
      {brandData.map((item) => (
        <Card className={styles.cardConatiner}>
          <img src={item.img} className={styles.brandImg} />
        </Card>
      ))}
    </>
  );
}
