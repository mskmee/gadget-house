import { useEffect, useState } from 'react';
import styles from './SearchResults.module.scss';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Benefits, Carousels, SliderNav } from '@/components/components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AppRoute } from '@/enums/Route';
import { outOfStockProductsList } from '@/constants/outOfStockProductsList';

export const SearchResults = () => {
  useDocumentTitle(`Search results`);
  const navigate = useNavigate();
  const { state } = useLocation();
  const searchValue = useTypedSelector((state) => state.search.searchValue);
  const isGlobalOverlayActive = useTypedSelector(
    (state) => state.search.isGlobalOverlayActive,
  );

  const [isFirstTime, setIsFirstTime] = useState(true);
  const [searchValueBeforeOverlay, setSearchValueBeforeOverlay] = useState(
    state.inputValue || '',
  );

  useEffect(() => {
    if (isGlobalOverlayActive && isFirstTime) {
      setSearchValueBeforeOverlay(searchValue);
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, [isGlobalOverlayActive]);

  useEffect(() => {
    if (searchValue.length === 0) {
      navigate('/');
    }
  }, [searchValue.length === 0]);

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.nothingFound}>
          {outOfStockProductsList.includes(searchValue.toLowerCase()) ? (
            <>
              <h2>{searchValue} is out of stock</h2>

              <span>This item is not available right now.</span>
            </>
          ) : (
            <>
              <h2>
                There {isGlobalOverlayActive ? 'were' : 'are'} no results
                searching
              </h2>
              <h2>
                for &quot;
                {isGlobalOverlayActive ? searchValueBeforeOverlay : searchValue}
                &quot;
              </h2>

              <span>
                You may have entered an incorrect query. Check the spelling. Try
                to use only keywords.
              </span>
            </>
          )}

          <Link to={AppRoute.ALL_PRODUCTS} className={styles.backToCatalogBtn}>
            Back to Catalog
          </Link>
        </div>
      </div>
      <SliderNav
        text="Recommendations for you"
        link="/recommendations"
        isVisibleSeeMoreBtn={false}
      />

      <Carousels classname="laptop-carousel" />
      <Benefits />
    </main>
  );
};
