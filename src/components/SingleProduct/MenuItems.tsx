import { FC, useRef, useState } from 'react';
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
