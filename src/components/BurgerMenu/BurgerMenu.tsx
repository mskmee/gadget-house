import { useState } from 'react';
import { BurgerMenuIcon, RightArrow } from '../../assets/constants';
import type { DrawerProps } from 'antd';
import { Button, Drawer } from 'antd';
import styles from './menu.module.scss';
import { Link } from 'react-router-dom';
import items from './constants';
import ButtonNav from '../Button/Button';
import buttonData from '../../constants/ButtonConstants';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={showDrawer} type="text">
        <img src={BurgerMenuIcon} />
      </Button>

      <Drawer
        closable={false}
        onClose={closeDrawer}
        open={open}
        placement={placement}
      >
        <div>
          <ul className={styles.burgerMenuTop}>
            {items.map((item) => (
              <Link to={item.link} className={styles.burgerMenuTopItem}>
                <div className={styles.burgerMenuTopItemRight}>
                  <img src={item.img} />
                  <p style={item.style}>{item.title}</p>
                </div>
                <img src={RightArrow} />
              </Link>
            ))}
          </ul>
        </div>
        <div className={styles.burgerMenuBottom}>
          {buttonData.map((item) => {
            return (
              <ButtonNav
                key={item.id}
                icon={item.img}
                hoverImg={item.hoverImg}
                clickImg={item.clickImg}
              />
            );
          })}
        </div>
      </Drawer>
    </div>
  );
}
