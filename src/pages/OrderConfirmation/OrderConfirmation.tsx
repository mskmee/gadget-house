import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import {
  ContactsForm,
  DeliveryForm,
  PaymentForm,
} from './libs/components/components';
import { useOrderConfirmation } from './libs/hooks/hooks';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { SuccessPopUp } from './SuccessPopUp';

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
  } = useOrderConfirmation();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const { deleteFromStore, increaseItemQuantity, decreaseItemQuantity } =
    useActions();

  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );

  if (products.length === 0) {
    onResetOrderProcess();
    goBack();
  }

  const handleChangeOrderProcessStage = (
    stage: 'contacts' | 'delivery' | 'payment',
  ) => {
    if (stage === 'contacts') {
      orderProcessStage === 'contacts';
    } else if (stage === 'delivery') {
      orderProcessStage === 'delivery';
    } else if (stage === 'payment') {
      orderProcessStage === 'payment';
    }
  };

  return (
    <section className={styles.order}>
      <SuccessPopUp
        isOpened={isSuccessPopUpOpen}
        onClose={onSuccessPopUpClose}
      />

      <div className={cn('container', styles.order__container)}>
        <h2 className={styles.order__title}>Order сonfirmation</h2>

        <div className={styles.order__content}>
          <div className={styles.order__tabs}>
            <div className={styles.order__tabItem}>
              <div className={styles.order__tabItemHeader}>
                <div className={styles.order__tabItemHeaderText}>
                  {orderProcessStage !== 'contacts' ? (
                    <div className={styles.order__tabItemCheckMark}>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 11L9.33364 15L18 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.order__tabItemNumber}>1</div>
                  )}
                  <h2 className={styles.order__tabItemTitle}>Contacts</h2>
                </div>

                {contactsFormValue && orderProcessStage !== 'contacts' ? (
                  <button
                    onClick={() => handleChangeOrderProcessStage('contacts')}
                    className={styles.order__tabItemBtnEdit}
                  >
                    Edit
                  </button>
                ) : null}
              </div>

              <div className={styles.order__tabItemContent}>
                {orderProcessStage === 'contacts' && (
                  <ContactsForm
                    stage={orderProcessStage}
                    onSubmit={onContactsFormSubmit}
                    initialValues={contactsFormValue}
                  />
                )}
              </div>
            </div>

            <div className={styles.order__tabItem}>
              <div className={styles.order__tabItemHeader}>
                <div className={styles.order__tabItemHeaderText}>
                  {orderProcessStage !== 'delivery' ? (
                    <div className={styles.order__tabItemCheckMark}>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 11L9.33364 15L18 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.order__tabItemNumber}>2</div>
                  )}
                  <h2 className={styles.order__tabItemTitle}>Delivery</h2>
                </div>

                {deliveryFormValue.deliveryType !== '' &&
                orderProcessStage !== 'delivery' ? (
                  <button
                    onClick={() => handleChangeOrderProcessStage('delivery')}
                    className={styles.order__tabItemBtnEdit}
                  >
                    Edit
                  </button>
                ) : null}
              </div>

              <div className={styles.order__tabItemContent}>
                <DeliveryForm
                  stage={orderProcessStage}
                  onSubmit={onDeliveryFormSubmit}
                  initialValues={deliveryFormValue}
                />
              </div>
            </div>

            <div className={styles.order__tabItem}>
              <div className={styles.order__tabItemHeader}>
                <div className={styles.order__tabItemHeaderText}>
                  {orderProcessStage !== 'payment' ? (
                    <div className={styles.order__tabItemCheckMark}>
                      <svg
                        width="22"
                        height="20"
                        viewBox="0 0 22 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 11L9.33364 15L18 7"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className={styles.order__tabItemNumber}>3</div>
                  )}
                  <h2 className={styles.order__tabItemTitle}>Payment</h2>
                </div>

                {paymentFormValue.paymentType !== '' &&
                orderProcessStage !== 'payment' ? (
                  <button
                    onClick={() => handleChangeOrderProcessStage('payment')}
                    className={styles.order__tabItemBtnEdit}
                  >
                    Edit
                  </button>
                ) : null}
              </div>

              <div className={styles.order__tabItemContent}>
                {orderProcessStage === 'payment' && (
                  <PaymentForm
                    stage={orderProcessStage}
                    onSubmit={onPaymentFormSubmit}
                    initialValues={paymentFormValue}
                  />
                )}
              </div>
            </div>
          </div>

          <div className={styles.order__items}>
            <ul className={styles.order__itemsList}>
              {products.map((product) => (
                <li className={styles.order__item} key={product.id}>
                  <article className={styles.order__itemWrapper}>
                    <div className={styles.order__itemImage}>
                      <img
                        src={product.img}
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

              <div className={styles.order__totalWrapper}>
                <p>
                  Delivery
                  <span>0 ₴</span>
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
