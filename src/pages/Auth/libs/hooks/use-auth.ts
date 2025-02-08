/* eslint-disable no-unused-vars */
import { Reducer, useReducer } from 'react';

import { LOGIN_FORM_INITIAL_VALUE, REGISTER_FORM_INITIAL_VALUE, FORGOT_FORM_INITIAL_VALUE } from '../constants/constants';
import { ForgotFormDto, FormType, LoginFormDto, RegisterFormDto } from '../types/form-dto';
import { AuthAction, FormEnum } from '../enums/enums';

type Return = {
  currentForm: FormType;
  setCurrentForm: (form: FormType) => void;
  loginFormValue: LoginFormDto;
  registerFormValue: RegisterFormDto;
  forgotFormValue: ForgotFormDto;
  onLoginFormSubmit: (loginFormValue: LoginFormDto) => void;
  onRegisterFormSubmit: (registerFormValue: RegisterFormDto) => void;
  onForgotFormSubmit: (forgotFormValue: ForgotFormDto) => void;
};

type State = {
  currentForm: FormType;
  loginFormValue: LoginFormDto;
  registerFormValue: RegisterFormDto;
  forgotFormValue: ForgotFormDto;
};

type ReducerAction =
  | {
    type: AuthAction.LOGIN_FORM;
    payload: LoginFormDto;
  }
  | {
    type: AuthAction.REGISTER_FORM;
    payload: RegisterFormDto;
  }
  | {
    type: AuthAction.FORGOT_FORM;
    payload: ForgotFormDto;
  }
  | { type: AuthAction.SET_FORM; payload: FormType };

const INITIAL_STATE: State = {
  currentForm: FormEnum.LOGIN,
  loginFormValue: LOGIN_FORM_INITIAL_VALUE,
  registerFormValue: REGISTER_FORM_INITIAL_VALUE,
  forgotFormValue: FORGOT_FORM_INITIAL_VALUE,
};

const reducer: Reducer<State, ReducerAction> = (state, action) => {
  switch (action.type) {
    case AuthAction.LOGIN_FORM:
      return {
        ...state,
        contactsFormValue: action.payload,
      };

    case AuthAction.REGISTER_FORM:
      return {
        ...state,
        deliveryFormValue: action.payload,
      };

    case AuthAction.FORGOT_FORM:
      return {
        ...state,
        paymentFormValue: action.payload,
      };

    case AuthAction.SET_FORM:
      return {
        ...state,
        currentForm: action.payload,
      };

    default:
      console.error('Unknown action type');
      return state;
  }
};

const useAuth = (): Return => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setCurrentForm = (form: FormType) => {
    dispatch({type: AuthAction.SET_FORM, payload: form})
  }

  const onLoginFormSubmit = (loginFormValue: LoginFormDto) =>
    dispatch({
      type: AuthAction.LOGIN_FORM,
      payload: loginFormValue,
    });

  const onRegisterFormSubmit = (registerFormValue: RegisterFormDto) =>
    dispatch({
      type: AuthAction.REGISTER_FORM,
      payload: registerFormValue,
    });

  const onForgotFormSubmit = (forgotFormValue: ForgotFormDto) =>
    dispatch({
      type: AuthAction.FORGOT_FORM,
      payload: forgotFormValue,
    });

  return {
    currentForm: state.currentForm,
    setCurrentForm,
    loginFormValue: state.loginFormValue,
    registerFormValue: state.registerFormValue,
    forgotFormValue: state.forgotFormValue,
    onLoginFormSubmit,
    onRegisterFormSubmit,
    onForgotFormSubmit,
  };
};

export { useAuth };
