import { FC } from 'react';

interface IUserIcon {
  stroke?: string;
  width?: string;
  height?: string;
}

export const NavUserIcon: FC<IUserIcon> = ({ stroke, width, height }) => {
  return (
    <svg
      width={width ? width : '21'}
      height={height ? height : '24'}
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 5.75C15 8.23527 12.9854 10.25 10.5 10.25C8.01465 10.25 6 8.23527 6 5.75C6 3.26473 8.01465 1.25 10.5 1.25C11.6934 1.25 12.838 1.72411 13.6819 2.56802C14.5258 3.41194 15 4.55652 15 5.75Z"
        stroke={stroke ? stroke : '#1C1817'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2151 15.25H6.78417C4.59708 15.3586 2.65941 16.6945 1.78016 18.7C0.719658 20.782 2.83616 22.75 5.29766 22.75H15.7016C18.1646 22.75 20.2811 20.782 19.2191 18.7C18.34 16.6945 16.4023 15.3586 14.2151 15.25Z"
        stroke={stroke ? stroke : '#1C1817'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
