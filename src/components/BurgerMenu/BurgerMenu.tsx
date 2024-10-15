import { Drawer } from 'antd';
import styles from '@/components/BurgerMenu/menu.module.scss';
import ButtonNav from '@/components/Button/Button';
import buttonData from '@/constants/ButtonConstants';
import Header from '@/components/Header/Header';
import { useMenuContext } from '@/context/menuContext.ts';
import { ProductList } from './ProductList';

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
        styles={{ body: { padding: '0', overflowY: 'auto' } }}
      >
        <div>
          <Header />
        </div>
        <ProductList isBurgerProductList={true} />
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
