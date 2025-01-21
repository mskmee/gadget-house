import { FC, useRef, useState } from 'react';
import style from './Product.module.scss';
import classNames from 'classnames';
import { menuItems } from '@/constants/singleProduct';

export const MenuItems: FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('About the product');
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleMenuClick = (menuTitle: string, refKey: string) => () => {
    setSelectedMenu(menuTitle);
    const targetRef = refs.current[refKey];
    if (targetRef) {
      window.scrollTo({
        top: targetRef.offsetTop,
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
            onClick={handleMenuClick(item?.title, item?.href)}
          >
            <a
              href={item?.href}
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
