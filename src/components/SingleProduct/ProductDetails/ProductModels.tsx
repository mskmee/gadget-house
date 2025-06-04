import style from '../Product.module.scss';
import classNames from 'classnames';
import { ProductModelsProps } from './type/interfaces';

function ProductModels({models, selectedModel, onSelectedModels}: ProductModelsProps) {
  console.log('models', models)
  return (
    <div className={style['product_other-models']}>
      <h3>Other models</h3>
      <ul>
        {models?.map((model) => {
          const isAvailable = model?.available;
          return (
            <li
              key={model?.id}
              tabIndex={0}
              className={classNames({
                [style['selected-model']]: selectedModel === model.value && isAvailable,
                [style['not-available']]: !isAvailable,
              })}
              onClick={() => onSelectedModels(model.value, true)}
            >
              {model.value}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default ProductModels;