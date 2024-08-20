import { FC, useState } from 'react';
import style from './SingleProduct.module.scss';

const menuItems = [
  { id: 1, title: 'About the product', href: '#product' },
  { id: 2, title: 'Characteristics', href: '#product-characteristics' },
  { id: 3, title: 'Reviews', href: '#product-reviews' },
  { id: 4, title: 'Photos', href: '#product-photos' },
  { id: 5, title: 'Accessories', href: '#product-accessories' },
];

export const MenuItems: FC = () => {
  const [selectedMenu, setSelectedMenu] = useState('About the product');

  const handleMenuClick = (menuTitle: string, href: string) => {
    return () => {
      setSelectedMenu(menuTitle);
      const targetElement = document.querySelector<HTMLElement>(href);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
    };
  };
  return (
    <section className={style['single-product__menu']}>
      <ul>
        {menuItems?.map((item) => (
          <li
            className={
              item?.title === selectedMenu ? 'menu-item active' : 'menu-item'
            }
            key={item?.id}
            onClick={handleMenuClick(item?.title, item?.href)}
          >
            <a
              href={item?.href}
              style={
                item?.title === selectedMenu
                  ? { color: '#00820D', transform: 'none' }
                  : {}
              }
            >
              {item?.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
