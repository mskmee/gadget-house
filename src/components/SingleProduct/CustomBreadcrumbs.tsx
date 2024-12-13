import { useLocation, useParams } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import style from './Product.module.scss';
import { getBreadcrumbItems } from '@/components/helpers.ts';
// import { AppRoute } from '@/enums/Route';
// import { laptopData, smartphoneData } from '../Card/constants';

export const CustomBreadcrumbs = () => {
  const { smartphone, id } = useParams();
  const location = useLocation();

  const breadcrumbItems = getBreadcrumbItems(location.pathname, {
    smartphone,
    id,
  });

  return (
    <Breadcrumb
      className={style['single-product__breadcrumb']}
      separator={
        <svg
          width="6"
          height="9"
          viewBox="0 0 6 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.01177 1.69355L5.1701 4.20131C5.37702 4.35593 5.49993 4.60618 5.49993 4.87288C5.49993 5.13958 5.37702 5.38983 5.1701 5.54444L2.01177 8.28581C1.7446 8.51025 1.3816 8.56275 1.06661 8.4224C0.751601 8.28205 0.535326 7.97151 0.503418 7.61381V2.3638C0.535868 2.00638 0.752351 1.69642 1.06726 1.55649C1.38218 1.41655 1.74477 1.46918 2.01177 1.69355Z"
            stroke="#808080"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      }
      items={breadcrumbItems}
    />
  );
};
