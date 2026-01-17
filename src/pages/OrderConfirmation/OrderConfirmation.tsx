import { FC, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import {
  ContactsForm,
  DeliveryForm,
  PaymentForm,
  ProductCardForOrder,
} from './libs/components/components';
import { useOrderConfirmation } from './libs/hooks/hooks';
import { AppRoute } from '@/enums/Route';
import { convertPriceToReadable } from '@/utils/helpers/product';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './order-confirmation.module.scss';

const OrderConfirmation: FC = () => {
  const {
    orderProcessStage,
    onContactsFormSubmit,
    onDeliveryFormSubmit,
    onResetOrderProcess,
    onPaymentFormSubmit,
    contactsFormValue,
    deliveryFormValue,
    paymentFormValue,
    isRulesAccepted,
    onOrderConfirmed,
    isOrderReady,
    onToggleRules,
    onEditForm,
    isEditing,
  } = useOrderConfirmation();

  const navigate = useNavigate();

  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const initialUserData = useTypedSelector((state) => state.auth.user);

  useEffect(() => {
    if (products.length === 0) {
      onResetOrderProcess();
      navigate(AppRoute.ALL_PRODUCTS);
    }
  }, [products, navigate, onResetOrderProcess]);

  const isOrderButtonDisabled = !isOrderReady || !isRulesAccepted || isEditing;

  const initialContactsValue = useMemo(
    () => ({
      fullName: contactsFormValue.fullName || initialUserData?.fullName || '',
      email: contactsFormValue.email || initialUserData?.email || '',
      phoneNumber:
        contactsFormValue.phoneNumber || initialUserData?.phoneNumber || '',
      comment: contactsFormValue.comment,
    }),
    [
      contactsFormValue.fullName,
      contactsFormValue.email,
      contactsFormValue.phoneNumber,
      contactsFormValue.comment,
      initialUserData?.fullName,
      initialUserData?.email,
      initialUserData?.phoneNumber,
    ],
  );

  return (
    <section className={styles.order}>
      <div className={cn('container', styles.order__container)}>
        <h2 className={styles.order__title}>Order сonfirmation</h2>

        <div className={styles.order__content}>
          <div className={styles.order__forms}>
            <ContactsForm
              stage={orderProcessStage}
              onSubmit={onContactsFormSubmit}
              initialValues={initialContactsValue}
              onEditForm={onEditForm}
            />

            <DeliveryForm
              stage={orderProcessStage}
              onSubmit={onDeliveryFormSubmit}
              initialValues={deliveryFormValue}
              onEditForm={onEditForm}
            />

            <PaymentForm
              stage={orderProcessStage}
              onSubmit={onPaymentFormSubmit}
              initialValues={paymentFormValue}
              onEditForm={onEditForm}
            />
          </div>

          <div className={styles.order__items}>
            <h3 className={styles.order__itemsTitle}>Your order</h3>
            <ul className={styles.order__itemsList}>
              {products.map((product) => (
                <ProductCardForOrder key={product.id} product={product} />
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
                disabled={isOrderButtonDisabled}
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
