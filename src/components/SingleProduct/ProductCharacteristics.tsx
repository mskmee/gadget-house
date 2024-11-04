import { FC, useState } from 'react';
import { currentProduct } from '@/constants/singleProduct';
import style from './Product.module.scss';

export const ProductCharacteristics: FC = () => {
  const [isShowed, setIsShowed] = useState(false);

  const showedAllCharacteristics = () => {
    setIsShowed(true);
  };
  return (
    <section className={style['characteristics']} id="product-characteristics">
      <h2>Characteristics</h2>
      <div className={style['characteristics_detail']}>
        <div className={style['characteristics_screen']}>
          <h3>Screen</h3>
          <ul>
            {currentProduct?.[0]?.characteristics?.screen?.map((item) => (
              <li key={item?.id}>
                <span>{item?.name}</span>
                <p></p>
                <span>{item?.value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={style['characteristics_communacation']}>
          <h3>Communication</h3>
          <ul>
            {currentProduct?.[0]?.characteristics?.communication?.map(
              (item) => (
                <li key={item?.id}>
                  <span>{item?.name}</span>
                  <p></p>
                  <span>{item?.value}</span>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className={style['characteristics_os']}>
          <h3>OS</h3>
          <ul>
            {currentProduct?.[0]?.characteristics?.os?.map((item) => (
              <li key={item?.id}>
                <span>{item?.name}</span>
                <p></p>
                <span>{item?.value}</span>
              </li>
            ))}
          </ul>
        </div>
        {isShowed && (
          <div className={style['characteristics_camera']}>
            <h3>Camera</h3>
            <ul>
              {currentProduct?.[0]?.characteristics?.camera?.map((item) => (
                <li key={item?.id}>
                  <span>{item?.name}</span>
                  <p></p>
                  <span>{item?.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {!isShowed && (
        <button onClick={showedAllCharacteristics}>All characteristics</button>
      )}
    </section>
  );
};
