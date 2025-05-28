import classNames from 'classnames';
import {productIsNotAvailableImg} from '@/assets/constants';

import style from '../Product.module.scss';
import { ProductColorsProps } from './type/interfaces';

function ProductColors({colors, selectedColor, onSelectedColor}: ProductColorsProps) {
  return (
    <div className={style['product_other-colors']}>
      <h3>Other colors</h3>
      <ul>
        {colors?.map((color, i) => {
          const isAvailable = i + 1 !== colors.length;
          return (
            <li
              key={i}
              tabIndex={0}
              className={classNames({
                [style['selected-color']]: selectedColor === color && isAvailable,
                [style['not-available']]: !isAvailable,
              })}
              style={{ backgroundColor: color }}
             onClick={() => onSelectedColor(color, isAvailable)}
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