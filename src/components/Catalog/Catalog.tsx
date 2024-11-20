import { useLocation } from 'react-router-dom';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

import { IGadget } from './generateGadgets';
import { distributeProductsByCategory } from './distributeProductsByCategory';
import { CatalogItem } from './CatalogItem';

import styles from './catalog.module.scss';
import { useState } from 'react';

export const Catalog = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);

  const products = distributeProductsByCategory(location.pathname.slice(1));
  const itemsPerPage = 18;

  // Отображаем товары на основе текущей страницы
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const onChange: PaginationProps['onChange'] = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.catalog}>
      <ul className={styles.catalog__list}>
        {Array.isArray(products) &&
          paginatedProducts.map((gadget: IGadget) => (
            <CatalogItem key={gadget.id} gadget={gadget} />
          ))}
      </ul>

      <Pagination
        showSizeChanger={false}
        showTitle={false}
        current={currentPage}
        total={products.length}
        onChange={onChange}
        pageSize={itemsPerPage}
        className={styles.catalog__pagination}
      />
    </div>
  );
};
