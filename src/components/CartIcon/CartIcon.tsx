import type { SVGProps } from 'react';

interface CardIconProps extends SVGProps<SVGSVGElement> {}

export default function CartIcon({ className, ...props }: CardIconProps) {
  return (
    <svg
      fill="none"
      width="43.000000"
      xmlns="http://www.w3.org/2000/svg"
      height="43.000000"
      viewBox="0 0 43 43"
      className={className}
      {...props}
    >
      <defs>
        <clipPath id="clip236_818">
          <rect
            rx="9.500000"
            fill="white"
            width="42.000000"
            height="42.000000"
            transform="translate(0.500000 0.500000)"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <rect
        rx="9.500000"
        fill="#00820D"
        width="42.000000"
        height="42.000000"
        transform="translate(0.500000 0.500000)"
        fillOpacity="1.000000"
      />
      <g clipPath="url(#clip236_818)">
        <path
          d="M26.45 15.63L26.45 12.77C26.4 10.08 24.18 7.95 21.5 8C18.81 7.95 16.59 10.08 16.54 12.77L16.54 15.63"
          stroke="#FFFFFF"
          strokeOpacity="1.000000"
          strokeWidth="2.000000"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M16.85 31.21L26.14 31.21C29.11 31.15 31.47 28.7 31.41 25.74L30.79 19.1C30.64 16.59 28.88 14.48 26.45 13.85C25.95 13.71 25.42 13.63 24.9 13.63L18.1 13.63C17.57 13.63 17.04 13.71 16.54 13.85C14.11 14.48 12.36 16.59 12.2 19.09L11.58 25.74C11.52 28.7 13.88 31.15 16.85 31.21Z"
          stroke="#FFFFFF"
          strokeOpacity="1.000000"
          strokeWidth="2.000000"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
