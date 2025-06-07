import { IconProps } from '../icons/type/interfaces';

function ArrowIcon({color="currentColor"}: IconProps) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 14L20 24L30 34" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
}

export default ArrowIcon;