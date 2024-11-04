import { NavPhoneIcon } from '@/assets/icons/NavPhoneIcon';
import { BasketIcon } from '../assets/icons/BasketIcon';
import { NavHeartIcon } from '@/assets/icons/NavHeartIcon';
import { NavUserIcon } from '@/assets/icons/NavUserIcon';
import { IButton } from '@/interfaces/interfaces';

export const buttonData: IButton[] = [
  {
    id: '1',
    img: NavPhoneIcon,
    href: 'tel:+380573333333',
  },
  {
    id: '2',
    img: NavHeartIcon,
    href: '/dashboard/user-1522/favorites',
  },
  {
    id: '3',
    img: NavUserIcon,
    href: '/sign-in',
  },
  {
    id: '4',
    img: BasketIcon,
    href: '/basket',
  },
];
