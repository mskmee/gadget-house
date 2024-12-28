/* eslint-disable no-unused-vars */
import { Reducer, useReducer } from 'react';

import {
  ContactsFormDto,
  DeliveryFormDto,
  PaymentFormDto,
} from '../types/types';
import { OrderStage, OrderConfirmationAction } from '../enums/enums';
import { useActions } from '@/hooks/useActions';
import { CONTACTS_FORM_INITIAL_VALUE } from '../constants/constants';
import {
  DELIVERY_FORM_INITIAL_VALUE,
  PAYMENT_FORM_INITIAL_VALUE,
} from '../constants/contacts-form-initial-value';

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
  const { clearCart } = useActions();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const sendOrderToBackend = async () => {
    dispatch({
      type: OrderConfirmationAction.CONFIRM_ORDER,
    });
    const orderData = {
      contacts: state.contactsFormValue,
      delivery: state.deliveryFormValue,
      payment: state.paymentFormValue,
    };

    try {
      //TODO: create service for cart action here. Example is in src/utils/products
      const response = await fetch('${process.env.VITE_API_URL}/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to send order');
      }

      const result = await response.json();
      clearCart();
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  const onContactsFormSubmit = (contactsFormValue: ContactsFormDto) =>
    dispatch({
      type: OrderConfirmationAction.SUBMIT_CONTACT_FORM,
      payload: contactsFormValue,
    });

  const onDeliveryFormSubmit = (data: DeliveryFormDto) =>
    dispatch({
      type: OrderConfirmationAction.SUBMIT_DELIVERY_FORM,
      payload: data,
    });

  const onPaymentFormSubmit = (data: PaymentFormDto) =>
    dispatch({
      type: OrderConfirmationAction.SUBMIT_PAYMENT_FORM,
      payload: data,
    });

  const onResetOrderProcess = () => {
    dispatch({
      type: OrderConfirmationAction.RESET_ORDER_PROCESS,
    });
    clearCart();
  };

  const onOrderConfirmed = () => {
    sendOrderToBackend();
    clearCart();
  };

  const onSuccessPopUpClose = () =>
    dispatch({ type: OrderConfirmationAction.CLOSE_SUCCESS_POPUP });

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
  };
};

export { useOrderConfirmation };
