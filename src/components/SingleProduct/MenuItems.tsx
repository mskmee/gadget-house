import React, { FC, useState } from 'react';
import style from './Product.module.scss';
import classNames from 'classnames';
import { menuItems } from '@/constants/singleProduct';

type MenuItemsProps = {
  refs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
};

export const MenuItems: FC<MenuItemsProps> = ({refs}) => {
  const [selectedMenu, setSelectedMenu] = useState('About the product');

  const handleMenuClick = (menuTitle: string, refKey: string) => {
    setSelectedMenu(menuTitle);
    const targetRef = refs.current[refKey];
    if (targetRef) {
      window.scrollTo({
        top: targetRef.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={classNames(style['single-product__menu'])}>
      <ul>
        {menuItems.map((item) => (
          <li
            className={
              item?.title === selectedMenu ? 'menu-item active' : 'menu-item'
            }
            key={item?.id}
            
          >
            <a
              href={item?.href}
              onClick={(e) => {
                e.preventDefault();
                handleMenuClick(item?.title, item?.href)
              }}
              className={classNames({
                [style['selected-menu']]: item?.title === selectedMenu,
              })}
            >
              {item?.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
