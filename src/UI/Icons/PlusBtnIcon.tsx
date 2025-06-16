import { IconProps } from "./type/interface";

function PlusBtnIcon({className=''}: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M5 12.0002C5.00024 8.66068 7.35944 5.78639 10.6348 5.1351C13.9102 4.48382 17.1895 6.23693 18.4673 9.32231C19.7451 12.4077 18.6655 15.966 15.8887 17.8212C13.1119 19.6764 9.41127 19.3117 7.05 16.9502C5.73728 15.6373 4.99987 13.8568 5 12.0002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.6252 12.0002H9.3252" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default PlusBtnIcon;