import { IShoppingCard } from "@/interfaces/interfaces";
import { MouseEvent } from "react";

export interface IBasketItemProps {
  product: IShoppingCard;
}

export interface IBasketChildren extends IBasketItemProps {
  handleDeleteFromStore: (e: MouseEvent<HTMLButtonElement>) => void;
  handleDecreaseItemQuantity: (e: MouseEvent<HTMLButtonElement>) => void;
  handleIncrementItemQuantity: (e: MouseEvent<HTMLButtonElement>) => void;
  handleSaveFavoriteProduct: (e: MouseEvent<HTMLButtonElement>) => void;
  isLikedProduct: boolean
}
