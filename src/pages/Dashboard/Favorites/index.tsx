import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './UserFavorites.module.scss';
import { FavoriteProductCard } from './FavoriteProductCard';
import { Link } from 'react-router-dom';
import { AppRoute } from '@/enums/Route';
import { useEffect, useRef, useState } from 'react';

export const UserFavorites = () => {
  const favoriteProducts = useTypedSelector(
    (state) => state.products.favoriteProducts,
  );

  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (visibleCount >= favoriteProducts.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);

          setTimeout(() => {
            setVisibleCount((prev) => prev + 5);
            setLoading(false);
          }, 2000);
        }
      },
      { threshold: 1.0 },
    );

    if (lastCardRef.current) {
      observerRef.current.observe(lastCardRef.current);
    }

    return () => {
      if (observerRef.current && lastCardRef.current) {
        observerRef.current.unobserve(lastCardRef.current);
      }
    };
  }, [visibleCount, favoriteProducts.length, loading]);

  return (
    <div className={styles.favoriteProducts}>
      <div className={styles.favoriteProductsWrap}>
        <h2 className={styles.favoriteProductsTitle}>
          My favorites{' '}
          {favoriteProducts.length > 0 && (
            <span>({favoriteProducts.length})</span>
          )}
        </h2>

        {!favoriteProducts.length ? (
          <>
            <p className={styles.favoriteProductsMessageText}>
              There are no items in favorites yet
            </p>
            <Link
              to={AppRoute.ALL_PRODUCTS}
              className={styles.favoriteProductsBtn}
            >
              Back to Catalog
            </Link>
          </>
        ) : (
          <div className={styles.favoriteProductCardsWrap}>
            {favoriteProducts
              .slice(0, visibleCount)
              .map((favoriteProduct, index) => (
                <div
                  ref={index === visibleCount - 1 ? lastCardRef : null}
                  key={favoriteProduct.id}
                >
                  <FavoriteProductCard favoriteProduct={favoriteProduct} />
                </div>
              ))}

            {loading && (
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner}></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
