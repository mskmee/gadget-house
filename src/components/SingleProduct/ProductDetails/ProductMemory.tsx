import style from '../Product.module.scss';
import classNames from 'classnames';
import { ProductMemoryProps } from './type/interfaces';

function ProductMemory({memories, selectedMemory, onSelectedMemory}: ProductMemoryProps) {  
  return (
    <div className={style['product_memory-card']}>
      <h3>Memory card</h3>
      <ul>
        {memories?.map(({ memory }) => (
          <li
            key={memory}
            tabIndex={0}
            className={classNames({
              [style['selected-memory']]:
                selectedMemory === memory,
            })}
            onClick={() => onSelectedMemory(memory, true)}
          >
            {memory}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductMemory;