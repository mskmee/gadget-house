import { NavPhoneIcon } from '@/assets/icons/NavPhoneIcon';
import { BasketIcon } from '../assets/icons/BasketIcon';
import { NavHeartIcon } from '@/assets/icons/NavHeartIcon';
import { NavUserIcon } from '@/assets/icons/NavUserIcon';
import { IButton } from '@/interfaces/interfaces';
import { DropdownHeartButton } from '@/assets/icons/DropdownHeartButton';
import { DropdownCellphoneButton } from '@/assets/icons/DropdownCellphoneButton';
import { DropdownPersonButton } from '@/assets/icons/DropdownPersonButton';


const userID = 'user-33212';

export const buttonData: IButton[] = [
  {
    id: '1',
    img: NavPhoneIcon,
    href: 'tel:+380573333333',
  },
  {
    id: '2',
    img: NavHeartIcon,
    href: `/dashboard/${userID}/favorites`,
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

export const dropdownBbuttonData: IButton[] = [
  {
    id: '1',
    img: DropdownCellphoneButton,
    href: 'tel:+380573333333',
  },
  {
    id: '2',
    img: DropdownHeartButton,
    href: `/dashboard/${userID}/favorites`,
  },
  {
    id: '3',
    img: DropdownPersonButton,
    href: '/sign-in',
  },
  {
    id: '4',
    img: BasketIcon,
    href: '/basket',
  },
];
