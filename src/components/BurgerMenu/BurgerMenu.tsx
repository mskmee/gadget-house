import { RightArrow } from '@/assets/constants';
import { Drawer } from 'antd';

import styles from '@/components/BurgerMenu/menu.module.scss';
import { Link } from 'react-router-dom';
import items from './constants';
import ButtonNav from '@/components/Button/Button';
import buttonData from '@/constants/ButtonConstants';
import Header from '@/components/Header/Header';
import { useMenuContext } from '@/context/menuContext.ts';

export default function BurgerMenu() {
  const { onMenuClose, isMenuOpen } = useMenuContext();

  return (
    <>
      <Drawer
        closable={false}
        width={'100vw'}
        onClose={onMenuClose}
        open={isMenuOpen}
        placement="left"
        bodyStyle={{ padding: '0', overflowY: 'auto' }}
      >
        <div>
          <Header />
        </div>
        <div className={styles.paddingContainer}>
          <ul className={styles.burgerMenuTop}>
            {items.map((item) => (
              <li key={item.key}>
                <Link to={item.link} className={styles.burgerMenuTopItem}>
                  <div className={styles.burgerMenuTopItemRight}>
                    <img src={item.img} alt={item.title} />
                    <p style={item.style}>{item.title}</p>
                  </div>
                  <img src={RightArrow} alt="Right Arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.burgerMenuBottom}>
          {buttonData.slice(0, 3).map((item) => (
            <ButtonNav
              key={item.id}
              icon={item.img}
              hoverImg={item.hoverImg}
              clickImg={item.clickImg}
            />
          ))}
        </div>
      </Drawer>
    </>
  );
}
