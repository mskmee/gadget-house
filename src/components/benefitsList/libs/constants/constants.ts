import { BenefitItem } from '../types/benefit-item.type';
import { image1, image2, image3, image4 } from '@/assets/benefits/images';

const BENEFIT_ITEMS: BenefitItem[] = [
  {
    imageUri: image1,
    text: 'Returns and exchanges',
    imageAlt: 'Returns and exchanges',
  },
  {
    imageUri: image2,
    text: 'Bonuses for purchases',
    imageAlt: 'Bonuses for purchases',
  },
  {
    imageUri: image3,
    text: 'Certified products',
    imageAlt: 'Certified products',
  },
  {
    imageUri: image4,
    text: 'Free shipping',
    imageAlt: 'Free shipping',
  },
];

export { BENEFIT_ITEMS };
