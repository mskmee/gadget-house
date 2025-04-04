import { FC } from 'react';
import { Avatar } from 'antd';

interface UserAvatarProps {
  name: string;
  imgUrl?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ name, imgUrl }) => {
  return (
    <Avatar
      size={71}
      src={imgUrl}
      style={{
        fontSize: imgUrl ? undefined : '42px',
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
