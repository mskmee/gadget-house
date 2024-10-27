import { FC } from 'react';
import styles from '@/components/Card/card.module.scss';
import classNames from 'classnames';

interface IHeartIcon {
  onClick: () => void;
  isLiked: boolean;
}

export const HeartIcon: FC<IHeartIcon> = ({ onClick, isLiked }) => {
  return (
    <svg
      className={classNames({
        [styles.likedIcon]: isLiked,
      })}
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.9998 28.5108L9.53084 19.6773C6.82305 16.8054 6.82305 12.3206 9.53084 9.44877C11.7984 7.18739 15.3524 6.85503 17.9998 8.65676M17.9998 28.5108L22.9033 23.3958L17.9998 28.5108ZM17.9998 28.5108L26.4688 19.6773C29.1766 16.8054 29.1766 12.3206 26.4688 9.44877C24.2013 7.18739 20.6473 6.85503 17.9998 8.65676M17.9998 28.5108L13.0963 23.3958L17.9998 28.5108ZM17.9998 8.65677C18.4891 8.96367 18.9385 9.32995 19.3378 9.74727L21.1198 11.6073"
        fill="#ffffff"
      />
      <path
        d="M16.9171 29.5489C17.4904 30.1468 18.4399 30.1668 19.0379 29.5935C19.6359 29.0202 19.6559 28.0707 19.0826 27.4727L16.9171 29.5489ZM9.53084 19.6773L8.43943 20.7063L8.44808 20.7154L9.53084 19.6773ZM9.53084 9.44877L8.47162 8.38667C8.46073 8.39753 8.45001 8.40855 8.43946 8.41974L9.53084 9.44877ZM17.1559 9.89684C17.8408 10.3629 18.7738 10.1856 19.2399 9.50069C19.706 8.81582 19.5286 7.88278 18.8438 7.41669L17.1559 9.89684ZM16.917 27.4727C16.3437 28.0707 16.3638 29.0203 16.9618 29.5936C17.5598 30.1669 18.5094 30.1468 19.0827 29.5488L16.917 27.4727ZM23.9862 24.4338C24.5594 23.8358 24.5394 22.8862 23.9414 22.313C23.3434 21.7397 22.3938 21.7597 21.8205 22.3577L23.9862 24.4338ZM16.9171 27.4727C16.3438 28.0707 16.3638 29.0202 16.9618 29.5935C17.5598 30.1668 18.5093 30.1468 19.0826 29.5489L16.9171 27.4727ZM26.4688 19.6773L27.5516 20.7154L27.5602 20.7063L26.4688 19.6773ZM26.4688 9.44877L27.5602 8.41974C27.5497 8.40855 27.539 8.39753 27.5281 8.38667L26.4688 9.44877ZM17.1559 7.41669C16.471 7.88278 16.2937 8.81582 16.7598 9.50069C17.2259 10.1856 18.1589 10.3629 18.8438 9.89684L17.1559 7.41669ZM16.917 29.5488C17.4903 30.1468 18.4399 30.1669 19.0379 29.5936C19.6359 29.0203 19.6559 28.0707 19.0827 27.4727L16.917 29.5488ZM14.1792 22.3577C13.6059 21.7597 12.6563 21.7397 12.0583 22.313C11.4603 22.8862 11.4402 23.8358 12.0135 24.4338L14.1792 22.3577ZM18.7969 7.38605C18.0951 6.94585 17.1693 7.15792 16.7291 7.85972C16.2889 8.56152 16.501 9.48729 17.2028 9.92748L18.7969 7.38605ZM19.3378 9.74727L18.254 10.7843L18.2547 10.785L19.3378 9.74727ZM20.0367 12.645C20.6098 13.2432 21.5594 13.2635 22.1575 12.6904C22.7557 12.1173 22.7761 11.1678 22.203 10.5696L20.0367 12.645ZM19.0826 27.4727L10.6136 18.6392L8.44808 20.7154L16.9171 29.5489L19.0826 27.4727ZM10.6222 18.6482C8.45926 16.3542 8.45926 12.7718 10.6222 10.4778L8.43946 8.41974C5.18685 11.8695 5.18685 17.2566 8.43946 20.7063L10.6222 18.6482ZM10.5901 10.5109C12.348 8.75767 15.1034 8.49999 17.1559 9.89684L18.8438 7.41669C15.6013 5.21007 11.2487 5.61712 8.47162 8.38667L10.5901 10.5109ZM19.0827 29.5488L23.9862 24.4338L21.8205 22.3577L16.917 27.4727L19.0827 29.5488ZM19.0826 29.5489L27.5516 20.7154L25.3861 18.6392L16.9171 27.4727L19.0826 29.5489ZM27.5602 20.7063C30.8128 17.2566 30.8128 11.8695 27.5602 8.41974L25.3775 10.4778C27.5404 12.7718 27.5404 16.3542 25.3775 18.6482L27.5602 20.7063ZM27.5281 8.38667C24.751 5.61712 20.3983 5.21007 17.1559 7.41669L18.8438 9.89684C20.8963 8.49999 23.6517 8.75767 25.4096 10.5109L27.5281 8.38667ZM19.0827 27.4727L14.1792 22.3577L12.0135 24.4338L16.917 29.5488L19.0827 27.4727ZM17.2028 9.92748C17.5872 10.1686 17.9403 10.4564 18.254 10.7843L20.4216 8.71026C19.9368 8.20351 19.391 7.75872 18.7969 7.38605L17.2028 9.92748ZM18.2547 10.785L20.0367 12.645L22.203 10.5696L20.421 8.70956L18.2547 10.785Z"
        fill="#6F4C9A"
      />
    </svg>
  );
};