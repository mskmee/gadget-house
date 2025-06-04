import classNames from 'classnames';
import {productIsNotAvailableImg} from '@/assets/constants';

import style from '../Product.module.scss';
import { ProductColorsProps } from './type/interfaces';

function ProductColors({colors, selectedColor, onSelectedColor}: ProductColorsProps) {
  return (
    <div className={style['product_other-colors']}>
      <h3>Other colors</h3>
      <ul>
        {colors?.map((color) => {
          const isAvailable = color?.available;
          return (
            <li
              key={color.id}
              tabIndex={0}
              className={classNames({
                [style['selected-color']]: selectedColor === color.value && isAvailable,
                [style['not-available']]: !isAvailable,
              })}
              style={{ backgroundColor: `#${color.value}` }}
              onClick={() => onSelectedColor(color.value, isAvailable)}
            >
              {!isAvailable && (
                <img
                  src={productIsNotAvailableImg}
                  alt="product isn't available"
                  width={16}
                  height={16}
                />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default ProductColors;