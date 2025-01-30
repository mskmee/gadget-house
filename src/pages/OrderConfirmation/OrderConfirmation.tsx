import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import {
  ContactsForm,
  DeliveryForm,
  PaymentForm,
} from './libs/components/components';
import { useOrderConfirmation } from './libs/hooks/hooks';
import { AppRoute } from '@/enums/Route';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useProductCardHandlers } from '@/hooks/useProductCardHandlers';
import { SuccessPopUp } from './SuccessPopUp';

import { HeartIcon } from '@/assets/icons/HeartIcon';

import styles from './order-confirmation.module.scss';

const OrderConfirmation: FC = () => {
  const {
    orderProcessStage,
    onContactsFormSubmit,
    onDeliveryFormSubmit,
    onPaymentFormSubmit,
    onResetOrderProcess,
    contactsFormValue,
    deliveryFormValue,
    paymentFormValue,
    onOrderConfirmed,
    onSuccessPopUpClose,
    isSuccessPopUpOpen,
    isRulesAccepted,
    isOrderReady,
    onToggleRules,
    orderId,
  } = useOrderConfirmation();

  const navigate = useNavigate();

  const { deleteFromStore, increaseItemQuantity, decreaseItemQuantity } =
    useActions();

  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const { isLiked, handleClickLike } = useProductCardHandlers();

  useEffect(() => {
    if (products.length === 0) {
      onResetOrderProcess();
      navigate(AppRoute.ALL_PRODUCTS);
    }
  }, [products, navigate]);

  return (
    <section className={styles.order}>
      <SuccessPopUp
        isOpened={isSuccessPopUpOpen}
        onClose={onSuccessPopUpClose}
        classname="order-success"
        orderId={orderId}
      />

      <div className={cn('container', styles.order__container)}>
        <h2 className={styles.order__title}>Order сonfirmation</h2>

        <div className={styles.order__content}>
          <div className={styles.order__forms}>
            <ContactsForm
              stage={orderProcessStage}
              onSubmit={onContactsFormSubmit}
              initialValues={contactsFormValue}
            />

            <DeliveryForm
              stage={orderProcessStage}
              onSubmit={onDeliveryFormSubmit}
              initialValues={deliveryFormValue}
            />

            <PaymentForm
              stage={orderProcessStage}
              onSubmit={onPaymentFormSubmit}
              initialValues={paymentFormValue}
            />
          </div>

          <div className={styles.order__items}>
            <h3 className={styles.order__itemsTitle}>Your order</h3>
            <ul className={styles.order__itemsList}>
              {products.map((product) => (
                <li className={styles.order__item} key={product.id}>
                  <article className={styles.order__itemWrapper}>
                    <div className={styles.order__itemImage}>
                      <img
                        src={product.images[0].link}
                        alt={product.title}
                        width={100}
                        height={100}
                      />
                    </div>

                    <div className={styles.order__itemInfo}>
                      <div className={styles.order__itemHeader}>
                        <h4 className={styles.order__itemTitle}>
                          {product.title}
                        </h4>

                        <button
                          className={styles.order__itemDelete}
                          type="button"
                          onClick={() => deleteFromStore(product.id)}
                        ></button>
                      </div>

                      <p className={styles.order__itemCode}>
                        code: {product.code}
                      </p>

                      <div className={styles.order__itemFooter}>
                        <div className={styles.order__itemQuantity}>
                          <button
                            onClick={() => decreaseItemQuantity(product.id)}
                          >
                            -
                          </button>
                          <p>{product.quantity}</p>
                          <button
                            onClick={() => increaseItemQuantity(product.id)}
                          >
                            +
                          </button>
                        </div>

                        <p className={styles.order__itemPrice}>
                          {convertPriceToReadable(
                            product.totalPrice,
                            currency,
                            locale,
                          )}
                        </p>
                      </div>
                    </div>
                  </article>

                  <article className={styles.order__itemWrapper_mobile}>
                    <div className={styles.order__itemInfo}>
                      <div className={styles.order__itemImage}>
                        <img
                          src={product.images[0].link}
                          alt={product.title}
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className={styles.order__itemContent}>
                        <div className={styles.order__itemHeader}>
                          <h4 className={styles.order__itemTitle}>
                            {product.title}
                          </h4>

                          <button
                            className={styles.order__itemDelete}
                            type="button"
                            onClick={() => deleteFromStore(product.id)}
                          ></button>
                        </div>

                        <div className={styles.order__itemFooter}>
                          <p className={styles.order__itemCode}>
                            code: {product.code}
                          </p>

                          <p className={styles.order__itemPrice}>
                            {convertPriceToReadable(
                              product.totalPrice,
                              currency,
                              locale,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.order__itemButtons}>
                      <div className={styles.order__itemQuantity}>
                        <div className={styles.order__itemQuantityBtn}>
                          <button
                            onClick={() => decreaseItemQuantity(product.id)}
                          >
                            -
                          </button>
                        </div>
                        <p>{product.quantity}</p>
                        <div className={styles.order__itemQuantityBtn}>
                          <button
                            onClick={() => increaseItemQuantity(product.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className={styles.order__itemQuantityBtnFavorite}>
                        <HeartIcon
                          onClick={handleClickLike}
                          isLiked={isLiked}
                        />
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            <div className={styles.order__total}>
              <div className={styles.order__totalWrapper}>
                <p>
                  Sum
                  <span>
                    {convertPriceToReadable(cardTotalAmount, currency, locale)}
                  </span>
                </p>
              </div>

              <div className={styles.order__totalWrapper}>
                <p>
                  Discount <span>0 ₴</span>
                </p>
              </div>

              <div
                className={cn(
                  styles.order__totalWrapper,
                  styles.order__totalWrapperInTotal,
                )}
              >
                <p>
                  In total
                  <span>
                    {convertPriceToReadable(cardTotalAmount, currency, locale)}
                  </span>
                </p>
              </div>

              <label className={styles.order__agreement}>
                <input
                  className={styles.order__agreementInput}
                  type="checkbox"
                  name="agreement"
                  id="agreement"
                  onChange={onToggleRules}
                />
                <span className={styles.order__agreementIcon}></span>
                <span className={styles.order__agreementText}>
                  I agree to the processing of my personal data
                </span>
              </label>

              <button
                className={cn('button button-secondary')}
                disabled={!isOrderReady || !isRulesAccepted}
                onClick={onOrderConfirmed}
              >
                Confirm the order
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
