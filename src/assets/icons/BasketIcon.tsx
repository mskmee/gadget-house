import { FC } from 'react';

interface IBasketIconProps {
  handleClickBuy: () => void;
}

export const BasketIcon: FC<IBasketIconProps> = ({ handleClickBuy }) => {
  return (
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={(e) => {
        e.preventDefault();
        handleClickBuy();
      }}
    >
      <rect width="43" height="43" rx="10" fill="#00820D" />
      <path
        d="M26.4582 15.6339V12.7708C26.4047 10.0851 24.1857 7.95032 21.4998 8.00088C18.814 7.95032 16.595 10.0851 16.5415 12.7708V15.6325"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5834 25.7436C11.5297 28.7084 13.8886 31.1562 16.8534 31.212H26.1467C29.1117 31.1562 31.4704 28.7084 31.4167 25.7436L30.7976 19.1023C30.6405 16.5985 28.8885 14.4809 26.4584 13.8577C25.9521 13.7104 25.4275 13.6351 24.9 13.6339H18.1001C17.5727 13.6351 17.0481 13.7104 16.5418 13.8577C14.1132 14.4811 12.3621 16.5971 12.2039 19.0995L11.5834 25.7436Z"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
