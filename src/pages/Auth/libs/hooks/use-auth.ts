/* eslint-disable no-unused-vars */
import { Reducer, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  LOGIN_FORM_INITIAL_VALUE,
  REGISTER_FORM_INITIAL_VALUE,
  FORGOT_FORM_INITIAL_VALUE,
} from '../constants/constants';
import {
  ForgotFormDto,
  FormType,
  LoginFormDto,
  RegisterFormDto,
} from '../types/form-dto';
import { AuthAction, FormEnum } from '../enums/enums';
import { AppDispatch } from '@/store';
import {
  createUser,
  forgotPassword,
  getCredentials,
  getUserData,
} from '@/store/auth/actions';
import { SuccessType } from '../types/successType';
import { LocalStorageKey, localStorageService } from '@/utils/packages/local-storage';

type Return = {
  currentForm: FormType;
  setCurrentForm: (form: FormType) => void;
  loginFormValue: LoginFormDto;
  registerFormValue: RegisterFormDto;
  forgotFormValue: ForgotFormDto;
  onLoginFormSubmit: (loginFormValue: LoginFormDto) => void;
  onRegisterFormSubmit: (registerFormValue: RegisterFormDto) => void;
  onForgotFormSubmit: (forgotFormValue: ForgotFormDto) => void;
  successType: SuccessType;
  setSuccessType: (type: SuccessType) => void;
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
  | { type: AuthAction.SET_FORM; payload: FormType }
  | {
      type: AuthAction.RESET_FORM;
    };

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
        loginFormValue: action.payload,
      };

    case AuthAction.REGISTER_FORM:
      return {
        ...state,
        registerFormValue: action.payload,
      };

    case AuthAction.FORGOT_FORM:
      return {
        ...state,
        forgotFormValue: action.payload,
      };

    case AuthAction.SET_FORM:
      return {
        ...state,
        currentForm: action.payload,
      };

    case AuthAction.RESET_FORM:
      return {
        ...state,
        loginFormValue: LOGIN_FORM_INITIAL_VALUE,
        registerFormValue: REGISTER_FORM_INITIAL_VALUE,
        forgotFormValue: FORGOT_FORM_INITIAL_VALUE,
      };

    default:
      console.error('Unknown action type');
      return state;
  }
};

const useAuth = (): Return => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const dispatchApp: AppDispatch = useDispatch();
  const [successType, setSuccessType] = useState<SuccessType>(null);

  const setCurrentForm = (form: FormType) => {
    dispatch({ type: AuthAction.SET_FORM, payload: form });
  };

  const onLoginFormSubmit = async (loginFormValue: LoginFormDto) => {
    const val: LoginFormDto = {
      email: loginFormValue.email,
      password: loginFormValue.password,
    };

    const result = await dispatchApp(getCredentials(val)).unwrap();

    if (result.accessToken) {
      setSuccessType(FormEnum.LOGIN);
      localStorageService.setItem(LocalStorageKey.ACCESS_TOKEN, result.accessToken);
      localStorageService.setItem(LocalStorageKey.REFRESH_TOKEN, result.refreshToken);

      dispatchApp(getUserData());
    }

    dispatch({
      type: AuthAction.LOGIN_FORM,
      payload: loginFormValue,
    });

    dispatch({ type: AuthAction.RESET_FORM });
  };

  const onRegisterFormSubmit = async (registerFormValue: RegisterFormDto) => {
    const val: RegisterFormDto = {
      email: registerFormValue.email,
      password: registerFormValue.password,
      firstName: registerFormValue.firstName,
      lastName: registerFormValue.lastName,
      phoneNumber: registerFormValue.phoneNumber,
    };

    const result = await dispatchApp(createUser(val)).unwrap();

    if (result.email) {
      setSuccessType(FormEnum.REGISTER);
    }

    dispatch({
      type: AuthAction.REGISTER_FORM,
      payload: registerFormValue,
    });

    dispatch({ type: AuthAction.RESET_FORM });

    dispatch({ type: AuthAction.RESET_FORM });
  };

  const onForgotFormSubmit = async (forgotFormValue: ForgotFormDto) => {

    const val = {
      email: forgotFormValue.email,
    };
    
    const result = await dispatchApp(forgotPassword(val.email)).unwrap();

    if (result) {
      setSuccessType(FormEnum.FORGOT);
    }

    dispatch({
      type: AuthAction.FORGOT_FORM,
      payload: forgotFormValue,
    });

    dispatch({ type: AuthAction.RESET_FORM });
  };

  return {
    currentForm: state.currentForm,
    setCurrentForm,
    loginFormValue: state.loginFormValue,
    registerFormValue: state.registerFormValue,
    forgotFormValue: state.forgotFormValue,
    onLoginFormSubmit,
    onRegisterFormSubmit,
    onForgotFormSubmit,
    successType,
    setSuccessType,
  };
};

export { useAuth };
