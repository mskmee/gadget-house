import { useState } from 'react';
import { BurgerMenuIcon, RightArrow, Vector } from '@/assets/constants';
import { Button, Drawer } from 'antd';
import styles from './menu.module.scss';
import { Link } from 'react-router-dom';
import items from './constants';
import ButtonNav from '../Button/Button';
import buttonData from '@/constants/ButtonConstants';
import { Header } from '../components';

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className={styles.burgerButton}
        onClick={open ? closeDrawer : showDrawer}
        type="text"
      >
        <img src={open ? Vector : BurgerMenuIcon} alt="Menu Icon" />
      </Button>

      <Drawer
        closable={false}
        width={'100vh'}
        onClose={closeDrawer}
        open={open}
        placement="left"
        bodyStyle={{ padding: '0' }}
      >
        <div className={styles.headerMobile}>
          <Header />
          <Button
            className={styles.burgerButton}
            onClick={open ? closeDrawer : showDrawer}
            type="text"
          >
            <img src={open ? Vector : BurgerMenuIcon} alt="Menu Icon" />
          </Button>
        </div>

        <div>
          <ul className={styles.burgerMenuTop}>
            {items.map((item) => (
              <Link
                key={item.key}
                to={item.link}
                className={styles.burgerMenuTopItem}
              >
                <div className={styles.burgerMenuTopItemRight}>
                  <img src={item.img} alt={item.title} />
                  <p style={item.style}>{item.title}</p>
                </div>
                <img src={RightArrow} alt="Right Arrow" />
              </Link>
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
