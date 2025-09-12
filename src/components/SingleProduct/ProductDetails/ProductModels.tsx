import style from '../Product.module.scss';
import classNames from 'classnames';
import { ProductModelsProps } from './type/interfaces';
import { Link } from 'react-router-dom';
import getFormattedCategoryName from '@/hooks/getFormattedCategoryName';

function ProductModels({ models, selectedModel }: ProductModelsProps) {
  const formatModelName = (name: string) => {
    return name
      .replace(/Applei/g, 'Apple i')
      .replace(/Apple([A-Z])/g, 'Apple $1')
      .replace(/Galaxy([A-Z])/g, 'Galaxy $1')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([0-9])([A-Z])/g, '$1 $2')
      .replace(/([a-zA-Z])([0-9])/g, '$1 $2')
      .replace(/i\s+Phone/g, 'iPhone')
      .replace(/\s+/g, ' ')
      .trim();
  };

  return (
    <div className={style['product_other-models']}>
      <h3>Other models</h3>
      <ul>
        {models?.map((model) => {
          const isAvailable = model?.available;
          const formatCategoryName = getFormattedCategoryName(
            model?.categoryId,
          );
          return (
            <li
              key={model?.productId}
              tabIndex={0}
              className={classNames({
                [style['selected-model']]:
                  selectedModel === model.attributeValue && isAvailable,
                [style['not-available']]: !isAvailable,
              })}
            >
              {isAvailable ? (
                <Link
                  to={`/${formatCategoryName}/${model.productId}/${model.href}`}
                >
                  {formatModelName(model.attributeValue)}
                </Link>
              ) : (
                formatModelName(model.attributeValue)
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductModels;
