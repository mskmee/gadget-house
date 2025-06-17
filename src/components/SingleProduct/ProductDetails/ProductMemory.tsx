import style from '../Product.module.scss';
import classNames from 'classnames';
import { ProductMemoryProps } from './type/interfaces';
import { Link } from 'react-router-dom';
import getFormattedCategoryName from '@/hooks/getFormattedCategoryName';

function ProductMemory({memories, selectedMemory}: ProductMemoryProps) {  

  return (
    <div className={style['product_memory-card']}>
      <h3>Memory card</h3>
      <ul>
        {memories?.map((memory) => {
          const isAvailable = memory?.available;
          const formatCategoryName = getFormattedCategoryName(memory?.categoryId);
          return (
            <li
              key={memory.productId}
              tabIndex={0}
              className={classNames({
                [style['selected-memory']]: selectedMemory === memory.attributeValue && isAvailable,
                [style['not-available']]: !isAvailable,
              })}
            >
              {isAvailable ? (
                <Link to={`/${formatCategoryName}/${memory.productId}/${memory.href}`}>{memory.attributeValue}</Link>
              ) : (
                memory.attributeValue
              )}
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default ProductMemory;