import style from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={style.spinnerContainer}>
      <div className={style.spinner} />
    </div>
  );
};

export default LoadingSpinner;
