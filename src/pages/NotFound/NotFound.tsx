import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import { Robot404 } from '@/assets/constants';

import styles from './not-found.module.scss';
import { AppRoute } from '@/enums/Route';

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      return navigate(-1);
    }
    navigate(AppRoute.ROOT);
  };

  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__container}>
        <div className={styles.notFound__wrapper}>
          <div className={styles.notFound__left}>
            <h2 className={styles.notFound__title_mobile}>
              Ooops! Page is not found...
            </h2>
            <h2 className={styles.notFound__title}>Ooops!</h2>
            <p className={styles.notFound__text}>Page is not found...</p>
            <p className={styles.notFound__description}>
              Uh oh, We can&#039;t find the page that you&#039;re looking for
            </p>

            <button
              onClick={goBack}
              className={cn('button', styles.notFound__link)}
            >
              Go Back
            </button>
          </div>

          <div className={styles.notFound__right}>
            <img className={styles.notFound__img} src={Robot404} alt="404" />
          </div>
        </div>
      </div>
    </div>
  );
}
