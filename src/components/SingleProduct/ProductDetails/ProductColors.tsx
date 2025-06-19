import classNames from 'classnames';
import {productIsNotAvailableImg} from '@/assets/constants';

import style from '../Product.module.scss';
import { ProductColorsProps } from './type/interfaces';
import { Link } from 'react-router-dom';
import getFormattedCategoryName from '@/hooks/getFormattedCategoryName';



function ProductColors({colors, selectedColor}: ProductColorsProps) {

  return (
    <div className={style['product_other-colors']}>
      <h3>Other colors</h3>
      <ul>
        {colors?.map((color) => {
          const isAvailable = color?.available;
          const formatCategoryName = getFormattedCategoryName(color?.categoryId);

          return (
            <li
              key={color.productId}
              tabIndex={0}
              className={classNames({
                [style['selected-color']]: selectedColor === color.attributeValue && isAvailable,
                [style['not-available']]: !isAvailable
              }, style['product-detail__item'])}
              style={{ backgroundColor: `#${color.attributeValue}` }}
            >
              <Link to={`/${formatCategoryName}/${color.productId}/${color.href}`} className={classNames(style['product-detail__link'])}></Link>
              {!isAvailable && (
                <img
                  src={productIsNotAvailableImg}
                  alt="product isn't available"
                  width={16}
                  height={16}
                  className={classNames(style['product-detail__notAvailable'])}
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