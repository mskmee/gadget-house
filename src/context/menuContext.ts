import { createContext, useContext } from 'react';

interface IMenuContext {
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}
const defaultMenuContextI = {
  isMenuOpen: false,
  onMenuOpen: () => {},
  onMenuClose: () => {},
}
export const MenuContext = createContext<IMenuContext>(defaultMenuContextI);
export const useMenuContext = (): IMenuContext => useContext<IMenuContext>(MenuContext)
