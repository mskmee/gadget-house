import { Drawer } from 'antd';
import styles from '@/components/BurgerMenu/menu.module.scss';
import { buttonData } from '@/constants/ButtonConstants';
import { Header } from '@/components/Header/Header';
import { useMenuContext } from '@/context/menuContext.ts';
import { NavButton } from '../Button';
import { CatalogList } from './CatalogList';

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
      >
        <div>
          <Header />
        </div>
        <CatalogList />
        <div className={styles.burgerMenuBottom}>
          {buttonData.slice(0, 3).map((item) => (
            <NavButton key={item.id} button={item} />
          ))}
        </div>
      </Drawer>
    </>
  );
}
