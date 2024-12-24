/* eslint-disable no-unused-vars */
import { Reducer, useReducer } from 'react';
import { ContactsFormDto } from '../types/types';
import { OrderStage, OrderConfirmationAction } from '../enums/enums';
import { CONTACTS_FORM_INITIAL_VALUE } from '../constants/constants';
import { useActions } from '@/hooks/useActions';

type Return = {
  orderProcessStage: OrderStage;
  contactsFormValue: ContactsFormDto;
  onContactsFormSubmit: (contactsFormValue: ContactsFormDto) => void;
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
      throw new Error('Unknown action.');
  }
};

const useOrderConfirmation = (): Return => {
  const { clearCart } = useActions();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const onContactsFormSubmit = (contactsFormValue: ContactsFormDto) =>
    dispatch({
      type: OrderConfirmationAction.SUBMIT_CONTACT_FORM,
      payload: contactsFormValue,
    });

  const onResetOrderProcess = () => {
    dispatch({
      type: OrderConfirmationAction.RESET_ORDER_PROCESS,
    });
    clearCart();
  };

  const onOrderConfirmed = () => {
    dispatch({
      type: OrderConfirmationAction.CONFIRM_ORDER,
    });
    clearCart();
  };

  const onSuccessPopUpClose = () =>
    dispatch({ type: OrderConfirmationAction.CLOSE_SUCCESS_POPUP });

  const onToggleRules = () =>
    dispatch({ type: OrderConfirmationAction.TOGGLE_RULES });

  return {
    onResetOrderProcess,
    onContactsFormSubmit,
    onSuccessPopUpClose,
    onOrderConfirmed,
    onToggleRules,
    orderProcessStage: state.orderProcessStage,
    contactsFormValue: state.contactsFormValue,
    isSuccessPopUpOpen: state.isSuccessPopUpOpen,
    isRulesAccepted: state.isRulesAccepted,
    isOrderReady: state.isOrderReady,
  };
};

export { useOrderConfirmation };
