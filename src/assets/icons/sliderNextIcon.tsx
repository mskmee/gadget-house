import { IconProps } from './type/interfaces';

function sliderNextIcon({color="currentColor"}: IconProps) {
  return (
    <svg
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.3335 1.33331L8.00016 7.99998L1.3335 14.6666"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default sliderNextIcon;