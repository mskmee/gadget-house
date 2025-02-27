/* eslint-disable no-unused-vars */
import { Reducer, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  ContactsFormDto,
  DeliveryFormDto,
  PaymentFormDto,
} from '../types/types';
import { OrderStage, OrderConfirmationAction } from '../enums/enums';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { CONTACTS_FORM_INITIAL_VALUE } from '../constants/constants';
import {
  DELIVERY_FORM_INITIAL_VALUE,
  PAYMENT_FORM_INITIAL_VALUE,
} from '../constants/contacts-form-initial-value';
import { OrderDto } from '@/utils/packages/orders/libs/types/order-item';
import { AppDispatch } from '@/store';
import { createOrder } from '@/store/shopping_cart/actions';

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
  onToggleRules: () => void;
  onEditForm: (stage: OrderStage) => void;
  isEditing: boolean;
  isRulesAccepted: boolean;
  isOrderReady: boolean;
  orderId: number | null;
};

type State = {
  acceptWithRules: boolean;
  contactsFormValue: ContactsFormDto;
  deliveryFormValue: DeliveryFormDto;
  paymentFormValue: PaymentFormDto;
  orderProcessStage: OrderStage;
  isRulesAccepted: boolean;
  isOrderReady: boolean;
  isEditing: boolean;
  orderId: number | null;
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
    type: OrderConfirmationAction.CONFIRM_ORDER;
    payload: { orderId: number };
  } | {
    type: OrderConfirmationAction.EDIT_FORM;
    payload: OrderStage;
  };

const INITIAL_STATE: State = {
  acceptWithRules: false,
  contactsFormValue: CONTACTS_FORM_INITIAL_VALUE,
  deliveryFormValue: DELIVERY_FORM_INITIAL_VALUE,
  paymentFormValue: PAYMENT_FORM_INITIAL_VALUE,
  orderProcessStage: OrderStage.CONTACTS,
  isRulesAccepted: false,
  isOrderReady: false,
  isEditing: false,
  orderId: null,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {
  switch (action.type) {
    case OrderConfirmationAction.SUBMIT_CONTACT_FORM:
      return {
        ...state,
        contactsFormValue: action.payload,
        orderProcessStage: OrderStage.DELIVERY,
        isEditing: state.isEditing ? true : false,
      };

    case OrderConfirmationAction.SUBMIT_DELIVERY_FORM:
      return {
        ...state,
        deliveryFormValue: action.payload,
        orderProcessStage: OrderStage.PAYMENT,
        isEditing: state.isEditing ? true : false,
      };

    case OrderConfirmationAction.SUBMIT_PAYMENT_FORM:
      return {
        ...state,
        paymentFormValue: action.payload,
        orderProcessStage: OrderStage.DONE,
        isOrderReady: true,
        isEditing: false,
      };

    case OrderConfirmationAction.RESET_ORDER_PROCESS:
      return INITIAL_STATE;

    case OrderConfirmationAction.CONFIRM_ORDER:
      return {
        ...state,
        orderId: action.payload.orderId,
        acceptWithRules: true,
        isSuccessOpen: true,
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

    case OrderConfirmationAction.EDIT_FORM:
      return {
        ...state,
        orderProcessStage: action.payload,
        isEditing: true,
      };


    default:
      console.error('Unknown action type');
      return state;
  }
};

const useOrderConfirmation = (): Return => {
  const navigate = useNavigate();
  const dispatchApp: AppDispatch = useDispatch();
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

  const onToggleRules = () =>
    dispatch({ type: OrderConfirmationAction.TOGGLE_RULES });

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

    dispatch({
      type: OrderConfirmationAction.CONFIRM_ORDER,
      payload: { orderId },
    });
    navigate(`/order-success/${orderId}`);
    dispatch({ type: OrderConfirmationAction.RESET_ORDER_PROCESS });
  };

  const onEditForm = (stage: OrderStage) =>
    dispatch({ type: OrderConfirmationAction.EDIT_FORM, payload: stage });

  const onResetOrderProcess = () => {
    dispatch({
      type: OrderConfirmationAction.RESET_ORDER_PROCESS,
    });
  };

  return {
    onResetOrderProcess,
    onContactsFormSubmit,
    onDeliveryFormSubmit,
    onPaymentFormSubmit,
    onOrderConfirmed,
    onToggleRules,
    onEditForm,
    orderProcessStage: state.orderProcessStage,
    contactsFormValue: state.contactsFormValue,
    deliveryFormValue: state.deliveryFormValue,
    paymentFormValue: state.paymentFormValue,
    isRulesAccepted: state.isRulesAccepted,
    isOrderReady: state.isOrderReady,
    isEditing: state.isEditing,
    orderId: state.orderId,
  };
};

export { useOrderConfirmation };
