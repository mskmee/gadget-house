import React from 'react';
import styles from './header.module.scss';
import { CatalogIcon } from '../../assets/constants';

export default function Header() {
  return (
    <>
      <div className={styles.headerTop}>
        <h1 className={styles.headerTopLogo}>GadgetHouse</h1>
      </div>
      <div className={styles.headerBottom}>
        <div className={styles.headerBottomCatalog}>
          <img src={CatalogIcon} />
          <h1>Catalog</h1>
        </div>
        <div className={styles.headerBottomSearch}>
          <h1>Search</h1>
        </div>

        <div className={styles.headerBottomButtons}>
          <h1>Buttons</h1>
        </div>
      </div>
    </>
  );
}
