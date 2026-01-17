import { AppRoute } from '@/enums/Route';
import styles from './CategoryEmpty.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Benefits, Carousels, SliderNav } from '@/components/components';

const CategoryEmpty = () => {
  const location = useLocation();

  const categoryName = location?.state?.categoryName || 'This category';

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
