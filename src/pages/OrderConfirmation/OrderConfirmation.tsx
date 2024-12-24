import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { convertPriceToReadable } from '@/utils/helpers/product';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { SuccessPopUp } from './SuccessPopUp';

import styles from './order-confirmation.module.scss';
import { OrderStage } from './libs/enums/order-stage';
import { ContactsForm } from './libs/components/components';
import { ContactsFormDto } from './libs/types/contacts-form-dto.type';
import { CONTACTS_FORM_INITIAL_VALUE } from './libs/constants/contacts-form-initial-value';

const OrderConfirmation: React.FC = () => {
  const [isOrderReady] = useState(false);
  const [acceptWithRules, setAcceptWithRules] = useState(false);
  const [contactsFormValue, setContactsFormValue] = useState<ContactsFormDto>(
    CONTACTS_FORM_INITIAL_VALUE,
  );
  const [orderProcessStage, setOrderProcessStage] = useState<OrderStage>(
    OrderStage.CONTACTS,
  );
  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const { clearCart } = useActions();
  // const [contactData, setContactData] = useState({
  //   fullName: '',
  //   phone: '',
  //   email: '',
  //   comment: '',
  // });
  // const [deliveryData, setDeliveryData] = useState({
  //   method: '',
  //   city: '',
  //   street: '',
  //   floor: '',
  //   flat: '',
  // });
  // const [paymentMethod, setPaymentMethod] = useState('');
  // const [errors, setErrors] = useState({
  //   fullName: '',
  //   phone: '',
  //   email: '',
  //   city: '',
  //   street: '',
  //   floor: '',
  //   flat: '',
  // });

  // const { deleteFromStore, increaseItemQuantity, decreaseItemQuantity } =
  //   useActions();

  const { products, cardTotalAmount, currency, locale } = useTypedSelector(
    (state) => state.shopping_card,
  );

  useEffect(() => {
    if (products.length === 0) {
      resetOrderData();
    }
  }, [products]);

  const resetOrderData = () => {
    // You can use use dispatch to combine few set actions into one action
    setContactsFormValue(CONTACTS_FORM_INITIAL_VALUE);
    setOrderProcessStage(OrderStage.DELIVERY);
  };

  // const validateFields = (name: string, value: string) => {
  //   switch (name) {
  //     case 'fullName':
  //       return value.trim() === '' ? 'Full name is required' : '';
  //     case 'phone':
  //       return /^\+?[0-9]{10,13}$/.test(value)
  //         ? ''
  //         : 'Enter a valid phone number';
  //     case 'email':
  //       return /\S+@\S+\.\S+/.test(value) ? '' : 'Enter a valid email address';
  //     case 'city':
  //       return value.trim() === '' ? 'City is required' : '';
  //     case 'street':
  //       return value.trim() === '' ? 'Street is required' : '';
  //     case 'floor':
  //       return value.trim() === '' ? 'Floor is required' : '';
  //     case 'flat':
  //       return value.trim() === '' ? 'Flat is required' : '';
  //     default:
  //       return '';
  //   }
  // };

  // const handleEdit = (tab: number) => setOrderProcessStage(tab);

  // const handleNext = () => {
  //   setOrderProcessStage((prev) => prev + 1);
  // };

  // const handleInputChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   const { name, value } = e.target;

  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [name]: validateFields(name, value),
  //   }));

  //   if (orderProcessStage === 1) {
  //     setContactData({ ...contactData, [name]: value });
  //   } else if (orderProcessStage === 2) {
  //     setDeliveryData({ ...deliveryData, [name]: value });
  //   }
  // };

  const toggleAcceptWithRules = () => setAcceptWithRules((prev) => !prev);

  // const handleDone = () => {
  //   setIsOrderReady(true);
  //   setOrderProcessStage(OrderStage.DONE);
  // };

  const onPopUpClose = () => setIsPopUpOpened(false);

  const handleOrderConfirm = () => {
    setIsPopUpOpened(true);
    clearCart();
  };

  // const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   if (name === 'delivery') {
  //     setDeliveryData((prev) => ({
  //       ...prev,
  //       method: value,
  //     }));
  //   }
  // };

  // const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPaymentMethod(e.target.value);
  // };

  const handleContactsFormSubmit = (data: ContactsFormDto) => {
    setContactsFormValue(data);
    setOrderProcessStage(OrderStage.DELIVERY);
  };

  return (
    <section className={styles.order}>
      <SuccessPopUp isOpened={isPopUpOpened} onClose={onPopUpClose} />

      <div className={cn('container', styles.order__container)}>
        <h2 className={styles.order__title}>Order сonfirmation</h2>
        <ContactsForm
          stage={orderProcessStage}
          onSubmit={handleContactsFormSubmit}
          initialValues={contactsFormValue}
        />
        {/* <div className={styles.order__content}>
          <div className={styles.order__tabs}>
            <div className={styles.order__tab}>
              <div className={styles.order__tabHeader}>
                <div className={styles.order__tabHeaderText}>
                  {currentTab > 1 ? (
                    <div className={styles.order__tabCheckMark}>
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
                    <div className={styles.order__tabNumber}>1</div>
                  )}
                  <h2 className={styles.order__tabTitle}>Contacts</h2>
                </div>
                {currentTab > 1 && (
                  <button
                    onClick={() => handleEdit(1)}
                    className={styles.order__tabBtnEdit}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className={styles.order__tabContent}>
                {currentTab === 1 ? (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="fullName"
                      className={styles.order__input}
                      value={contactData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.fullName && (
                      <p className={styles.order__error}>{errors.fullName}</p>
                    )}

                    <input
                      type="tel"
                      placeholder="Phone number"
                      name="phone"
                      className={styles.order__input}
                      value={contactData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.phone && (
                      <p className={styles.order__error}>{errors.phone}</p>
                    )}

                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className={styles.order__input}
                      value={contactData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.email && (
                      <p className={styles.order__error}>{errors.email}</p>
                    )}

                    <textarea
                      placeholder="Comment"
                      name="comment"
                      className={styles.order__input}
                      value={contactData.comment}
                      onChange={handleInputChange}
                    />

                    <button
                      onClick={handleNext}
                      className={styles.order__button}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <p className={styles.order__clientData}>
                    {contactData.fullName}, {contactData.phone},{' '}
                    {contactData.email}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.order__tab}>
              <div className={styles.order__tabHeader}>
                <div className={styles.order__tabHeaderText}>
                  {currentTab > 2 ? (
                    <div className={styles.order__tabCheckMark}>
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
                    <div className={styles.order__tabNumber}>2</div>
                  )}
                  <h2 className={styles.order__tabTitle}>Delivery</h2>
                </div>
                {currentTab > 2 && (
                  <button
                    onClick={() => handleEdit(2)}
                    className={styles.order__tabBtnEdit}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className={styles.order__tabContent}>
                {currentTab === 2 ? (
                  <>
                    <label className={styles.order__radio}>
                      <input
                        className={styles.order__radioInput}
                        type="radio"
                        name="delivery"
                        value="courier"
                        onChange={handleDeliveryChange}
                      />
                      <span className={styles.order__radioSpan}>
                        By courier
                      </span>
                    </label>

                    <label className={styles.order__radio}>
                      <input
                        className={styles.order__radioInput}
                        type="radio"
                        name="delivery"
                        value="nova"
                        onChange={handleDeliveryChange}
                      />
                      <span className={styles.order__radioSpan}>
                        Nova Poshta
                      </span>
                    </label>

                    <label className={styles.order__radio}>
                      <input
                        className={styles.order__radioInput}
                        type="radio"
                        name="delivery"
                        value="ukr"
                        onChange={handleDeliveryChange}
                      />
                      <span className={styles.order__radioSpan}>UkrPoshta</span>
                    </label>

                    <input
                      type="text"
                      placeholder="City"
                      name="city"
                      className={styles.order__input}
                      value={deliveryData.city}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.city && (
                      <p className={styles.order__error}>{errors.city}</p>
                    )}

                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      className={styles.order__input}
                      value={deliveryData.street}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.street && (
                      <p className={styles.order__error}>{errors.street}</p>
                    )}

                    <div className={styles.order__address}>
                      <input
                        type="text"
                        name="floor"
                        placeholder="Floor"
                        className={styles.order__input}
                        value={deliveryData.floor}
                        onChange={handleInputChange}
                      />
                      {errors.floor && (
                        <p className={styles.order__error}>{errors.floor}</p>
                      )}

                      <input
                        type="text"
                        name="flat"
                        placeholder="Flat number"
                        className={styles.order__input}
                        value={deliveryData.flat}
                        onChange={handleInputChange}
                      />
                      {errors.flat && (
                        <p className={styles.order__error}>{errors.flat}</p>
                      )}
                    </div>

                    <button
                      onClick={handleNext}
                      className={styles.order__button}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <p className={styles.order__clientData}>
                    {[
                      deliveryData.method,
                      deliveryData.city,
                      deliveryData.street,
                      deliveryData.floor,
                      deliveryData.flat,
                    ]
                      .filter((item) => item && item.trim() !== '')
                      .join(', ')}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.order__tab}>
              <div className={styles.order__tabHeader}>
                <div className={styles.order__tabHeaderText}>
                  {currentTab > 3 ? (
                    <div className={styles.order__tabCheckMark}>
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
                    <div className={styles.order__tabNumber}>3</div>
                  )}
                  <h2 className={styles.order__tabTitle}>Payment</h2>
                </div>

                {currentTab > 3 && (
                  <button
                    onClick={() => handleEdit(3)}
                    className={styles.order__tabBtnEdit}
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentTab === 3 ? (
                <div className={styles.order__tabContent}>
                  <label className={styles.order__radio}>
                    <input
                      className={styles.order__radioInput}
                      type="radio"
                      name="payment"
                      value="check"
                      onChange={handlePaymentChange}
                    />
                    <span className={styles.order__radioSpan}>
                      Payment after checking
                    </span>
                  </label>

                  <label className={styles.order__radio}>
                    <input
                      className={styles.order__radioInput}
                      type="radio"
                      name="payment"
                      value="courier"
                      onChange={handlePaymentChange}
                    />
                    <span className={styles.order__radioSpan}>To courier</span>
                  </label>

                  <button
                    onClick={handleDone}
                    className={cn(
                      styles.order__button,
                      styles.order__buttonDone,
                    )}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <p
                  className={styles.order__clientData}
                  style={{ marginLeft: '76px' }}
                >
                  {paymentMethod}
                </p>
              )}
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
            </ul> */}

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
              onChange={toggleAcceptWithRules}
            />
            <span className={styles.order__agreementIcon}></span>
            <span className={styles.order__agreementText}>
              I agree to the processing of my personal data
            </span>
          </label>

          <button
            className={cn(styles.order__button, styles.order__confirm)}
            disabled={!isOrderReady || !acceptWithRules}
            onClick={handleOrderConfirm}
          >
            Confirm the order
          </button>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </section>
  );
};

export default OrderConfirmation;
