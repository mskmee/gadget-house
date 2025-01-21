import { useState, useCallback, useEffect } from 'react';

export const useResponsiveCarouselSettings = (
  classname: string,
  productImagesLength: number,
) => {
  const responsiveSettings = [
    {
      breakpoint: 450,
      slidesToShow: classname === 'brands-carousel' ? 3 : 2,
      gap: classname === 'brands-carousel' ? 10 : 10,
      containerPadding: 32,
    },
    {
      breakpoint: 568,
      slidesToShow: classname === 'brands-carousel' ? 3 : 2,
      gap: classname === 'brands-carousel' ? 15 : 10,
      containerPadding: 40,
    },
    {
      breakpoint: 700,
      slidesToShow: classname === 'brands-carousel' ? 3 : 2,
      gap: classname === 'brands-carousel' ? 30 : 40,
      containerPadding: 40,
    },
    {
      breakpoint: 1024,
      slidesToShow: classname === 'brands-carousel' ? 4 : 3,
      gap: classname === 'brands-carousel' ? 15 : 20,
      containerPadding: 40,
    },
    {
      breakpoint: 1100,
      slidesToShow: classname === 'brands-carousel' ? 4 : 3,
      gap: classname === 'brands-carousel' ? 15 : 20,
      containerPadding: 40,
    },
    {
      breakpoint: 1250,
      slidesToShow: classname === 'brands-carousel' ? 4 : 3,
      gap: classname === 'brands-carousel' ? 15 : 50,
      containerPadding: 40,
    },
    {
      breakpoint: 1300,
      slidesToShow: classname === 'brands-carousel' ? 4 : 3,
      gap: classname === 'brands-carousel' ? 15 : 50,
      containerPadding: 100,
    },
    {
      breakpoint: 1440,
      slidesToShow:
        classname === 'brands-carousel'
          ? 5
          : classname === 'photos-carousel'
            ? productImagesLength
            : 4,
      gap: classname === 'brands-carousel' ? 15 : 20,
      containerPadding: 100,
    },
    {
      breakpoint: Infinity,
      slidesToShow:
        classname === 'brands-carousel'
          ? 5
          : classname === 'photos-carousel'
            ? productImagesLength
            : 4,
      gap: classname === 'brands-carousel' ? 15 : 40,
      containerPadding: 100,
    }, // Default for large screens
  ];

  const calculateSettings = useCallback(() => {
    const screenWidth = document.documentElement.clientWidth;
    const matchedSetting =
      responsiveSettings.find(
        (setting) => screenWidth + 16 < setting.breakpoint,
      ) || responsiveSettings[responsiveSettings.length - 1];

    const allGapsWidth = matchedSetting.gap * (matchedSetting.slidesToShow - 1);

    const itemWidth =
      (screenWidth - allGapsWidth - matchedSetting.containerPadding) /
      matchedSetting.slidesToShow;

    return {
      count: matchedSetting.slidesToShow,
      gap: matchedSetting.gap,
      itemWidth,
    };
  }, [classname]);

  const [settings, setSettings] = useState(calculateSettings);

  useEffect(() => {
    const handleResize = () => setSettings(calculateSettings());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateSettings]);

  return settings;
};
