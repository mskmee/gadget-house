import style from '../Product.module.scss';
import classNames from 'classnames';
import { ProductModelsProps } from './type/interfaces';

function ProductModels({models, selectedModel, onSelectedModels}: ProductModelsProps) {
  return (
    <div className={style['product_other-models']}>
      <h3>Other models</h3>
      <ul>
        {models?.map(({ model }) => (
          <li
            key={model}
            tabIndex={0}
            className={classNames({
              [style['selected-model']]: selectedModel === model,
            })}
            onClick={() => onSelectedModels(model, true)}
          >
            {model}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductModels;