import { AppRoute } from '@/enums/Route';
import styles from './CategoryEmpty.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Benefits, Carousels, SliderNav } from '@/components/components';
import { useEffect } from 'react';
import { getAllProducts } from '@/store/products/actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { DEFAULT_PAGE, DEFAULT_SIZE } from '@/constants/pagination';

const CategoryEmpty = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const categoryName = location?.state?.categoryName || 'This category';

  useEffect(() => {
    dispatch(getAllProducts({ page: DEFAULT_PAGE, size: DEFAULT_SIZE }));
  }, [dispatch]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.nothingFound}>
          <h2>{categoryName} is out of stock</h2>
          <span>This category is not available right now.</span>

          <Link to={AppRoute.ROOT} className={styles.backToCatalogBtn}>
            Back to Home
          </Link>
        </div>
      </div>

      <SliderNav text="Recommendations for you" link="/recommendations" />
      <Carousels classname="laptop-carousel" />
      <Benefits />
    </main>
  );
};

export default CategoryEmpty;
