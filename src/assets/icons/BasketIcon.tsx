import { IconProps } from './type/interfaces';

export const BasketIcon = ({
  color = 'currentColor',
  size = { width: '24', height: '24' },
}: IconProps) => {
  return (
    <svg
      width={size.width}
      height={size.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00063 16.1407C4.96273 18.2335 6.6278 19.9613 8.72063 20.0007H15.2806C17.3735 19.9613 19.0385 18.2335 19.0006 16.1407L18.5636 11.4527C18.4527 9.68529 17.216 8.19053 15.5006 7.75065C15.1432 7.64667 14.7729 7.59348 14.4006 7.59265H9.60063C9.22837 7.59348 8.85808 7.64667 8.50063 7.75065C6.78636 8.19067 5.55026 9.68433 5.43863 11.4507L5.00063 16.1407Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5005 9.38862V7.36762C15.4628 5.4718 13.8964 3.96493 12.0005 4.00062C10.1046 3.96493 8.53823 5.4718 8.50049 7.36762V9.38762"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
