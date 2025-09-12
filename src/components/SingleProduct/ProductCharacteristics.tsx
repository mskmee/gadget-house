// import { FC, useState } from 'react';
// import { staticCurrentProduct } from '@/constants/singleProduct';
// import style from './Product.module.scss';
// import { useMediaQuery } from 'react-responsive';

// export const ProductCharacteristics: FC = () => {
//   const [isShowed, setIsShowed] = useState(false);

//   const isLargerThan500px = useMediaQuery({
//     query: '(max-width: 500px)',
//   });

//   const showedAllCharacteristics = () => {
//     setIsShowed(true);
//   };
//   return (
//     <section className={style['characteristics']} id="product-characteristics">
//       <h2>Characteristics</h2>
//       <div className={style['characteristics_detail']}>
//         <div className={style['characteristics_screen']}>
//           <h3>Screen</h3>
//           <ul>
//             {staticCurrentProduct?.[0]?.characteristics?.screen?.map((item) => (
//               <li key={item?.id}>
//                 <span>{item?.name}</span>
//                 {!isLargerThan500px && <p></p>}
//                 <span>{item?.value}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className={style['characteristics_communacation']}>
//           <h3>Communication</h3>
//           <ul>
//             {staticCurrentProduct?.[0]?.characteristics?.communication?.map(
//               (item) => (
//                 <li key={item?.id}>
//                   <span>{item?.name}</span>
//                   {!isLargerThan500px && <p></p>}
//                   <span>{item?.value}</span>
//                 </li>
//               ),
//             )}
//           </ul>
//         </div>
//         <div className={style['characteristics_os']}>
//           <h3>OS</h3>
//           <ul>
//             {staticCurrentProduct?.[0]?.characteristics?.os?.map((item) => (
//               <li key={item?.id}>
//                 <span>{item?.name}</span>
//                 {!isLargerThan500px && <p></p>}
//                 <span>{item?.value}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         {isShowed && (
//           <div className={style['characteristics_camera']}>
//             <h3>Camera</h3>
//             <ul>
//               {staticCurrentProduct?.[0]?.characteristics?.camera?.map(
//                 (item) => (
//                   <li key={item?.id}>
//                     <span>{item?.name}</span>
//                     {!isLargerThan500px && <p></p>}
//                     <span>{item?.value}</span>
//                   </li>
//                 ),
//               )}
//             </ul>
//           </div>
//         )}
//       </div>
//       {!isShowed && (
//         <button onClick={showedAllCharacteristics}>All characteristics</button>
//       )}
//     </section>
//   );
// };

import { FC, useState } from 'react';
import style from './Product.module.scss';
import { useMediaQuery } from 'react-responsive';
import { ProductItemResponseDto } from '@/utils/packages/products';

interface Props {
  product: ProductItemResponseDto;
}

export const ProductCharacteristics: FC<Props> = ({ product }) => {
  const [isShowed, setIsShowed] = useState(false);

  const isLargerThan500px = useMediaQuery({
    query: '(max-width: 500px)',
  });

  const characteristics = product?.productAttributeResponseDtos || [];

  const screen = characteristics.filter((item) =>
    [
      'Display diagonal',
      'Screen resolution',
      'Screen type',
      'Screen refresh rate',
      'Glass protection technology',
    ].includes(item.name),
  );

  const communication = characteristics.filter((item) =>
    [
      'Communication standards',
      'Number of SIM cards',
      'SIM card size',
      'Flesh card',
      'Max play time',
      'Bluetooth version',
      'Weight',
    ].includes(item.name),
  );

  const os = characteristics.filter((item) =>
    [
      'Operating system',
      'Processor model',
      'Processor frequency',
      'Video card',
    ].includes(item.name),
  );

  const camera = characteristics.filter((item) =>
    ['Main camera', 'Selfie camera', 'Sensor resolution'].includes(item.name),
  );

  return (
    <section className={style['characteristics']} id="product-characteristics">
      <h2>Characteristics</h2>
      <div className={style['characteristics_detail']}>
        {/* Screen */}
        {screen.length > 0 && (
          <div className={style['characteristics_screen']}>
            <h3>Screen</h3>
            <ul>
              {screen.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  {!isLargerThan500px && <p></p>}
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Communication */}
        {communication.length > 0 && (
          <div className={style['characteristics_communacation']}>
            <h3>Communication</h3>
            <ul>
              {communication.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  {!isLargerThan500px && <p></p>}
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* OS */}
        {os.length > 0 && (
          <div className={style['characteristics_os']}>
            <h3>OS</h3>
            <ul>
              {os.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  {!isLargerThan500px && <p></p>}
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Camera */}
        {isShowed && camera.length > 0 && (
          <div className={style['characteristics_camera']}>
            <h3>Camera</h3>
            <ul>
              {camera.map((item, index) => (
                <li key={index}>
                  <span>{item.name}</span>
                  {!isLargerThan500px && <p></p>}
                  <span>{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {!isShowed && camera.length > 0 && (
        <button onClick={() => setIsShowed(true)}>All characteristics</button>
      )}
      {/* {!isShowed && (
      <button onClick={() => setIsShowed(true)}>All characteristics</button>
    )} */}
    </section>
  );
};
