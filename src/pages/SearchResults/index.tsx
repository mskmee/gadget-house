import { useEffect, useState } from 'react';
import styles from './SearchResults.module.scss';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import {
  Benefits,
  Carousels,
  MyCard,
  SliderNav,
} from '@/components/components';
import { laptopData } from '@/components/Card/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';

export const SearchResults = () => {
  useDocumentTitle(`Search results`);
  const navigate = useNavigate();
  const location = useLocation();
  const searchValue = useTypedSelector((state) => state.search.searchValue);
  const isGlobalOverlayActive = useTypedSelector(
    (state) => state.search.isGlobalOverlayActive,
  );

  const [isFirstTime, setIsFirstTime] = useState(true);
  const [searchValueBeforeOverlay, setSearchValueBeforeOverlay] = useState(
    location.state || '',
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
          <h2>
            There {isGlobalOverlayActive ? 'were' : 'are'} no results searching
            for &quot;
            {isGlobalOverlayActive ? searchValueBeforeOverlay : searchValue}
            &quot;
          </h2>

          <p>
            You may have entered an incorrect query. Check the spelling. Try to
            use only keywords.
          </p>
        </div>
      </div>
      <SliderNav
        text="Recommendations for you"
        link="/recommendations"
        isVisibleSeeMoreBtn={false}
      />
      <Carousels classname="laptop-carousel">
        {Array.from({ length: 8 }, (_, i) => (
          <MyCard
            key={`laptop-${i}`}
            product={laptopData[i % laptopData.length]}
            classname="laptop"
          />
        ))}
      </Carousels>
      <Benefits />
    </main>
  );
};
