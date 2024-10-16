import { useMemo, useState } from 'react';
import Container from '@/components/Container/Container';
import Pagination from '@/components/Pagination/Pagination';
import ProductCard from '@/components/ProductCard/ProductCard';
import PhoneFilters from '@/components/PhoneFilters/PhoneFilters';
import { getPaginatedData } from '@/utils/getPaginatedData.utils';
import { PAGE_SIZE, PHONES_DATA } from '@/constants/catalog.constants';
import styles from './Smartphones.module.scss';

export default function Smartphones() {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPhones = useMemo(
    () => getPaginatedData(PHONES_DATA, currentPage, PAGE_SIZE),
    [currentPage],
  );

  return (
    <Container className={styles.layout}>
      <div className={styles.container}>
        <PhoneFilters paginatedPhones={paginatedPhones} />
        <div className={styles.cards}>
          {paginatedPhones.map(
            ({ code, href, name, price, rating, characteristics }) => (
              <ProductCard
                key={code}
                code={code}
                href={href}
                name={name}
                price={price}
                rating={rating}
                characteristics={characteristics}
              />
            ),
          )}
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          total={PHONES_DATA.length}
          current={currentPage}
          defaultPageSize={PAGE_SIZE}
          showSizeChanger={false}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </Container>
  );
}
