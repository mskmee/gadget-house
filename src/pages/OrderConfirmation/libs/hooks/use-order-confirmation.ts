/* eslint-disable no-unused-vars */
import { Reducer, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import {
  ContactsFormDto,
  DeliveryFormDto,
  PaymentFormDto,
} from '../types/types';
import { OrderStage, OrderConfirmationAction } from '../enums/enums';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CONTACTS_FORM_INITIAL_VALUE } from '../constants/constants';
import {
  DELIVERY_FORM_INITIAL_VALUE,
  PAYMENT_FORM_INITIAL_VALUE,
} from '../constants/contacts-form-initial-value';
import { OrderDto } from '@/utils/packages/orders/libs/types/order-item';
import { createOrder } from '@/store/actions/orderActions';
import { AppDispatch } from '@/store';

type Return = {
  orderProcessStage: OrderStage;
  contactsFormValue: ContactsFormDto;
  deliveryFormValue: DeliveryFormDto;
  paymentFormValue: PaymentFormDto;
  onContactsFormSubmit: (contactsFormValue: ContactsFormDto) => void;
  onDeliveryFormSubmit: (deliveryFormValue: DeliveryFormDto) => void;
  onPaymentFormSubmit: (paymentFormValue: PaymentFormDto) => void;
  onResetOrderProcess: () => void;
  onOrderConfirmed: () => void;
  onSuccessPopUpClose: () => void;
  onToggleRules: () => void;
  isSuccessPopUpOpen: boolean;
  isRulesAccepted: boolean;
  isOrderReady: boolean;
  orderId: number;
};

type State = {
  acceptWithRules: boolean;
  contactsFormValue: ContactsFormDto;
  deliveryFormValue: DeliveryFormDto;
  paymentFormValue: PaymentFormDto;
  orderProcessStage: OrderStage;
  isSuccessPopUpOpen: boolean;
  isRulesAccepted: boolean;
  isOrderReady: boolean;
  orderId: number;
};

type ReducerAction =
  | {
    type: OrderConfirmationAction.SUBMIT_CONTACT_FORM;
    payload: ContactsFormDto;
  }
  | {
    type: OrderConfirmationAction.SUBMIT_DELIVERY_FORM;
    payload: DeliveryFormDto;
  }
  | {
    type: OrderConfirmationAction.SUBMIT_PAYMENT_FORM;
    payload: PaymentFormDto;
  }
  | {
    type: OrderConfirmationAction.RESET_ORDER_PROCESS;
  }
  | {
    type: OrderConfirmationAction.TOGGLE_RULES;
  }
  | {
    type: OrderConfirmationAction.ORDER_READY;
  }
  | {
    type: OrderConfirmationAction.CLOSE_SUCCESS_POPUP;
  }
  | {
    type: OrderConfirmationAction.CONFIRM_ORDER;
    payload: { orderId: number };
  };

const INITIAL_STATE: State = {
  acceptWithRules: false,
  contactsFormValue: CONTACTS_FORM_INITIAL_VALUE,
  deliveryFormValue: DELIVERY_FORM_INITIAL_VALUE,
  paymentFormValue: PAYMENT_FORM_INITIAL_VALUE,
  orderProcessStage: OrderStage.CONTACTS,
  isSuccessPopUpOpen: false,
  isRulesAccepted: false,
  isOrderReady: false,
  orderId: 0,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {
  switch (action.type) {
    case OrderConfirmationAction.SUBMIT_CONTACT_FORM:
      return {
        ...state,
        contactsFormValue: action.payload,
        orderProcessStage: OrderStage.DELIVERY,
      };

    case OrderConfirmationAction.SUBMIT_DELIVERY_FORM:
      return {
        ...state,
        deliveryFormValue: action.payload,
        orderProcessStage: OrderStage.PAYMENT,
      };

    case OrderConfirmationAction.SUBMIT_PAYMENT_FORM:
      return {
        ...state,
        paymentFormValue: action.payload,
        orderProcessStage: OrderStage.DONE,
        isOrderReady: true,
      };

    case OrderConfirmationAction.RESET_ORDER_PROCESS:
      return INITIAL_STATE;

    case OrderConfirmationAction.CONFIRM_ORDER:
      return {
        ...INITIAL_STATE,
        orderId: action.payload.orderId,
        isSuccessPopUpOpen: true,
      };

    case OrderConfirmationAction.CLOSE_SUCCESS_POPUP:
      return {
        ...state,
        isSuccessPopUpOpen: false,
      };

    case OrderConfirmationAction.TOGGLE_RULES:
      return {
        ...state,
        isRulesAccepted: !state.isRulesAccepted,
      };

    case OrderConfirmationAction.ORDER_READY:
      return {
        ...state,
        isOrderReady: true,
      };

    default:
      console.error('Unknown action type');
      return state;
  }
};

const useOrderConfirmation = (): Return => {
  const dispatchApp: AppDispatch = useDispatch();
  const { clearCart } = useActions();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { products } = useTypedSelector(
    (state) => state.shopping_card,
  );
  const onContactsFormSubmit = (contactsFormValue: ContactsFormDto) =>
    dispatch({
      type: OrderConfirmationAction.SUBMIT_CONTACT_FORM,
      payload: contactsFormValue,
    });

  const onDeliveryFormSubmit = (deliveryFormValue: DeliveryFormDto) =>
    dispatch({
      type: OrderConfirmationAction.SUBMIT_DELIVERY_FORM,
      payload: deliveryFormValue,
    });

  const onPaymentFormSubmit = (paymentFormValue: PaymentFormDto) =>
    dispatch({
      type: OrderConfirmationAction.SUBMIT_PAYMENT_FORM,
      payload: paymentFormValue,
    });

  const onResetOrderProcess = () => {
    dispatch({
      type: OrderConfirmationAction.RESET_ORDER_PROCESS,
    });
  };

  const onOrderConfirmed = async () => {
    const orderData: OrderDto = {
      fullName: state.contactsFormValue.fullName,
      email: state.contactsFormValue.email,
      phoneNumber: state.contactsFormValue.phoneNumber,
      comment: state.contactsFormValue.comment,
      cartItems: products.map(({ id, quantity }) => ({
        productId: id,
        quantity,
      })),
      address: {
        city: state.deliveryFormValue.city,
        street: state.deliveryFormValue.street,
        departmentNumber: state.deliveryFormValue.departmentNumber,
        houseNumber: state.deliveryFormValue.houseNumber,
        flat: state.deliveryFormValue.flat,
      },
      deliveryMethod: state.deliveryFormValue.deliveryType,
      paymentMethod: state.paymentFormValue.paymentType,
    };

    const result = await dispatchApp(createOrder(orderData)).unwrap();
    const orderId = result;

    dispatch({ type: OrderConfirmationAction.CONFIRM_ORDER, payload: { orderId } });
  };

  const onSuccessPopUpClose = () => {
    dispatch({ type: OrderConfirmationAction.CLOSE_SUCCESS_POPUP });
    dispatch({ type: OrderConfirmationAction.RESET_ORDER_PROCESS });
    clearCart();
  }

  const onToggleRules = () =>
    dispatch({ type: OrderConfirmationAction.TOGGLE_RULES });

  return {
    onResetOrderProcess,
    onContactsFormSubmit,
    onDeliveryFormSubmit,
    onPaymentFormSubmit,
    onSuccessPopUpClose,
    onOrderConfirmed,
    onToggleRules,
    orderProcessStage: state.orderProcessStage,
    contactsFormValue: state.contactsFormValue,
    deliveryFormValue: state.deliveryFormValue,
    paymentFormValue: state.paymentFormValue,
    isSuccessPopUpOpen: state.isSuccessPopUpOpen,
    isRulesAccepted: state.isRulesAccepted,
    isOrderReady: state.isOrderReady,
    orderId: state.orderId,
  };
};

export { useOrderConfirmation };
