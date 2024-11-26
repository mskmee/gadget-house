import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectProductsByCategory } from '@/store/products/selectors';
import { PageLayout } from '@/components/PageLayout/PageLayout';

export default function Laptops() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const category = location.pathname.slice(1);
  const productsByCategory = useSelector(selectProductsByCategory(category));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 секунды для демонстрации скелетона
  }, []);

  return (
    <PageLayout
      title="Smartphone"
      data={productsByCategory}
      isLoading={isLoading}
    />
  );
}
