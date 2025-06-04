import style from '../Product.module.scss';
import classNames from 'classnames';
import { ProductMemoryProps } from './type/interfaces';

function ProductMemory({memories, selectedMemory, onSelectedMemory}: ProductMemoryProps) {  

  return (
    <div className={style['product_memory-card']}>
      <h3>Memory card</h3>
      <ul>
        {memories?.map((memory) => {
          const isAvailable = memory?.available;
          return (
            <li
              key={memory.id}
              tabIndex={0}
              className={classNames({
                [style['selected-memory']]: selectedMemory === memory.value && isAvailable,
                [style['not-available']]: !isAvailable,
              })}
              onClick={() => onSelectedMemory(memory.value, true)}
            >
              {memory.value}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default ProductMemory;