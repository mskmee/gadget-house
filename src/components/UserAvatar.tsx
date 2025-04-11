import { FC } from 'react';
import { Avatar } from 'antd';

interface UserAvatarProps {
  name: string;
  size?: number;
  imgUrl?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  name,
  size = 71,
  imgUrl,
}) => {
  return (
    <Avatar
      size={size}
      src={imgUrl}
      style={{
        fontSize: imgUrl ? undefined : `${size / 2}px`,
        fontWeight: 500,
        lineHeight: '150%',
        color: '#F8F7FA',
        border: '4px solid #fff',
        backgroundColor: '#00820D',
      }}
    >
      {!imgUrl && name.charAt(0).toUpperCase()}
    </Avatar>
  );
};
