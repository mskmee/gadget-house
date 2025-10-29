import React, { useEffect } from 'react';
import styles from './loader.module.scss';

const LoaderSquares: React.FC = () => {
  useEffect(() => {
    const container = document.querySelector(`.${styles.container}`);
    const squares = {
      1: container?.querySelector(`.${styles.square1}`) as HTMLElement,
      2: container?.querySelector(`.${styles.square2}`) as HTMLElement,
      3: container?.querySelector(`.${styles.square3}`) as HTMLElement,
      4: container?.querySelector(`.${styles.square4}`) as HTMLElement,
    };

    if (!container || !squares[1]) return;

    let currentStep = 1;
    let isAnimating = false;

    const resetToInitialState = () => {
      Object.values(squares).forEach((sq) => {
        if (!sq) return;
        sq.style.transition = 'none';
        sq.style.transform = 'none';
        [
          'width',
          'height',
          'top',
          'bottom',
          'left',
          'right',
          'borderRadius',
        ].forEach((prop) => {
          // @ts-ignore
          sq.style[prop] = '';
        });
      });

      requestAnimationFrame(() => {
        Object.values(squares).forEach((sq) => {
          if (!sq) return;
          sq.style.transition = 'all 0.5s ease-in-out';
        });
      });
    };

    const animateStep = (step: number) => {
      if (isAnimating) return;
      isAnimating = true;

      Object.values(squares).forEach((sq) => {
        if (!sq) return;
        sq.style.transition = 'all 0.5s ease-in-out';
      });

      switch (step) {
        case 1:
          resetToInitialState();
          break;

        case 2:
          squares[2].style.height = '24px';
          squares[2].style.top = '33px';

          squares[1].style.width = '90px';
          squares[1].style.left = '0';
          squares[1].style.right = '0';
          squares[1].style.top = '0';
          break;

        case 3:
          squares[1].style.width = '43px';
          squares[1].style.left = '47px';
          squares[1].style.right = '0';
          squares[1].style.top = '0';

          squares[4].style.height = '90px';
          squares[4].style.bottom = '0';
          squares[4].style.left = '0';
          break;

        case 4:
          squares[4].style.height = '57px';
          squares[4].style.bottom = '33px';
          squares[4].style.left = '0';

          squares[3].style.width = '90px';
          squares[3].style.bottom = '0';
          squares[3].style.right = '0';
          break;

        case 5:
          squares[3].style.width = '43px';
          squares[3].style.bottom = '0';
          squares[3].style.left = '0';

          squares[2].style.height = '58px';
          squares[2].style.right = '0';
          break;

        case 6:
          squares[1].style.height = '58px';
          squares[1].style.top = '0';
          squares[1].style.right = '0';

          squares[2].style.height = '28px';
          squares[2].style.top = '62px';
          squares[2].style.right = '0';

          squares[3].style.height = '58px';
          squares[3].style.bottom = '0';
          squares[3].style.right = '0';

          squares[4].style.height = '28px';
          squares[4].style.bottom = '62px';
          break;

        case 7:
          squares[1].style.height = '28px';
          squares[1].style.top = '31px';
          squares[1].style.right = '0';

          squares[2].style.width = '90px';
          squares[2].style.height = '28px';
          squares[2].style.top = '62px';
          squares[2].style.right = '0';

          squares[4].style.height = '28px';
          squares[4].style.width = '90px';
          squares[4].style.bottom = '62px';

          squares[3].style.height = '28px';
          squares[3].style.bottom = '31px';
          squares[3].style.left = '0';
          break;

        case 8:
          squares[1].style.width = '43px';
          squares[1].style.height = '59px';
          squares[1].style.top = '31px';
          // squares[1].style.right = '0';

          squares[2].style.width = '43px';
          squares[2].style.height = '28px';
          squares[2].style.bottom = '0';
          squares[2].style.right = '0';
          squares[2].style.left = '0';

          squares[3].style.width = '43px';
          squares[3].style.height = '59px';

          squares[4].style.width = '43px';
          squares[4].style.height = '28px';
          squares[4].style.top = '0';
          squares[4].style.left = '47px';
          break;

        case 9:
          squares[1].style.height = '28px';
          squares[1].style.top = '62px';
          squares[1].style.right = '0';

          squares[2].style.height = '58px';
          squares[2].style.top = '32px';
          squares[2].style.left = '0';

          squares[3].style.width = '43px';
          squares[3].style.height = '28px';
          squares[3].style.top = '0';

          squares[4].style.width = '43px';
          squares[4].style.height = '58px';
          squares[4].style.top = '0';
          squares[4].style.left = '47px';
          break;
      }

      setTimeout(() => {
        isAnimating = false;
        currentStep++;
        if (currentStep > 9) currentStep = 1;
        animateStep(currentStep);
      }, 400);
    };

    animateStep(1);

    return () => {
      isAnimating = true;
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={`${styles.square} ${styles.square1}`}></div>
      <div className={`${styles.square} ${styles.square2}`}></div>
      <div className={`${styles.square} ${styles.square3}`}></div>
      <div className={`${styles.square} ${styles.square4}`}></div>
    </div>
  );
};

export default LoaderSquares;
