import { useState } from "react";

type ProductDetails = {
  selectedColor?: string | null;
  selectedModel?: string | [];
  selectedMemory?: string | [];
}

export function useProductDetails(initial: ProductDetails) {
  const [productCharacteristics, setProductCharacteristics] = useState(initial);

  function changeCharacteristic(value: string, inStock = true, type: keyof ProductDetails) {
    if(!inStock) return;

    setProductCharacteristics(prev => ({
      ...prev,
      [type]: value,
    }))
  }

  return {changeCharacteristic, productCharacteristics}
}