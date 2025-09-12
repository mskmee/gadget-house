import { useActions } from '@/hooks/useActions.ts';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useMediaQuery } from 'react-responsive';
import { MouseEvent, useState } from 'react';
import { MAX_PRODUCT_QUANTITY } from '@/constants/globalConstans';
import BasketItemMobile from './BasketItemMobile';
import BasketItemPC from './BasketItemPC';
import { IBasketItemProps } from './type/interfaces';
import AuthModal from '@/pages/Auth/AuthModal';

export default function BasketItem({ product }: IBasketItemProps) {
  const { id, quantity } = product;

  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const {
    toggleFavorite,
    deleteFromStore,
    closeBasketPopup,
    increaseItemQuantity,
    decreaseItemQuantity,
  } = useActions();

  const isAuthenticated = useTypedSelector(
    (state) => state.auth.isAuthenticated,
  );
  const userToken = useTypedSelector((state) => state.auth.userToken);

  const isLikedProduct = useTypedSelector((state) =>
    state.products.favoriteProducts.some((fav) => fav.id === product.id),
  );

  const isLessThan768px = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const handleDeleteFromStore = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteFromStore(id);
  };
  const handleDecreaseItemQuantity = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity > 1) {
      decreaseItemQuantity(id);
    } else {
      closeBasketPopup();
      decreaseItemQuantity(id);
    }
  };
  const handleIncrementItemQuantity = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (quantity !== MAX_PRODUCT_QUANTITY) {
      increaseItemQuantity(id);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleSaveFavoriteProduct = () => {
    if (!isAuthenticated && !userToken) {
      setAuthModalOpen(true);
    } else {
      if (product) {
        toggleFavorite(product);
      }
    }
  };

  return (
    <>
      {isLessThan768px ? (
        <BasketItemMobile
          product={product}
          handleDeleteFromStore={handleDeleteFromStore}
          handleDecreaseItemQuantity={handleDecreaseItemQuantity}
          handleIncrementItemQuantity={handleIncrementItemQuantity}
          handleSaveFavoriteProduct={handleSaveFavoriteProduct}
          isLikedProduct={isLikedProduct}
        />
      ) : (
        <BasketItemPC
          product={product}
          handleDeleteFromStore={handleDeleteFromStore}
          handleDecreaseItemQuantity={handleDecreaseItemQuantity}
          handleIncrementItemQuantity={handleIncrementItemQuantity}
          handleSaveFavoriteProduct={handleSaveFavoriteProduct}
          isLikedProduct={isLikedProduct}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
}
