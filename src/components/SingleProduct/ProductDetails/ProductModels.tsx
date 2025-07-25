import style from '../Product.module.scss';
import classNames from 'classnames';
import { ProductModelsProps } from './type/interfaces';
import { Link } from 'react-router-dom';
import getFormattedCategoryName from '@/hooks/getFormattedCategoryName';

function ProductModels({models, selectedModel}: ProductModelsProps) {

  return (
    <div className={style['product_other-models']}>
      <h3>Other models</h3>
      <ul>
        {models?.map((model) => {
          const isAvailable = model?.available;
          const formatCategoryName = getFormattedCategoryName(model?.categoryId);
          return (
            <li
              key={model?.productId}
              tabIndex={0}
              className={classNames({
                [style['selected-model']]: selectedModel === model.attributeValue && isAvailable,
                [style['not-available']]: !isAvailable,
              })}
            >
              { isAvailable ? (
                  <Link to={`/${formatCategoryName}/${model.productId}/${model.href}`}>{model.attributeValue}</Link>
                ) : (
                  model.attributeValue
                )
              }
              
              
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default ProductModels;