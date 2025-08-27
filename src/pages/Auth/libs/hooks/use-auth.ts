/* eslint-disable no-unused-vars */
import { Reducer, useCallback, useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/store';
import { AuthAction, FormEnum } from '../enums/enums';
import {
  LOGIN_FORM_INITIAL_VALUE,
  REGISTER_FORM_INITIAL_VALUE,
  FORGOT_FORM_INITIAL_VALUE,
} from '../constants/constants';
import {
  ForgotFormDto,
  FormType,
  LoginFormDto,
  LoginPermissionFormDto,
  RegisterFormDto,
} from '../types/form-dto';
import {
  createUser,
  forgotPassword,
  getCredentials,
  getUserData,
} from '@/store/auth/actions';
import { SuccessType } from '../types/successType';

import { LOGIN_PERMISSION_FORM_INITIAL_VALUE } from '../constants/login-permission-form-initial-value';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { DataStatus } from '@/enums/data-status';

type Return = {
  currentForm: FormType;
  setCurrentForm: (form: FormType) => void;
  loginFormValue: LoginFormDto;
  registerFormValue: RegisterFormDto;
  forgotFormValue: ForgotFormDto;
  loginPermissionFormValue: LoginPermissionFormDto;
  onLoginFormSubmit: (loginFormValue: LoginFormDto) => void;
  onRegisterFormSubmit: (registerFormValue: RegisterFormDto) => void;
  onForgotFormSubmit: (forgotFormValue: ForgotFormDto) => void;
  onLoginPermissionFormSubmit: (
    loginPermissionFormValue: LoginPermissionFormDto,
  ) => void;
  successType: SuccessType;
  setSuccessType: (type: SuccessType) => void;
  isLoading: boolean;
  authError: string | null;
};

type State = {
  currentForm: FormType;
  loginFormValue: LoginFormDto;
  forgotFormValue: ForgotFormDto;
  registerFormValue: RegisterFormDto;
  loginPermissionFormValue: LoginPermissionFormDto;
};

type ReducerAction =
  | {
      type: AuthAction.LOGIN_FORM;
      payload: LoginFormDto;
    }
  | {
      type: AuthAction.LOGIN_PERMISSION_FORM;
      payload: LoginPermissionFormDto;
    }
  | {
      type: AuthAction.REGISTER_FORM;
      payload: RegisterFormDto;
    }
  | {
      type: AuthAction.FORGOT_FORM;
      payload: ForgotFormDto;
    }
  | {
      type: AuthAction.SET_FORM;
      payload: FormType;
    }
  | {
      type: AuthAction.RESET_FORM;
    };

const INITIAL_STATE: State = {
  currentForm: FormEnum.LOGIN,
  loginFormValue: LOGIN_FORM_INITIAL_VALUE,
  loginPermissionFormValue: LOGIN_PERMISSION_FORM_INITIAL_VALUE,
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

    case AuthAction.LOGIN_PERMISSION_FORM:
      return {
        ...state,
        loginPermissionFormValue: action.payload,
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
        loginPermissionFormValue: LOGIN_PERMISSION_FORM_INITIAL_VALUE,
      };

    default:
      console.error('Unknown action type');
      return state;
  }
};

const useAuth = (): Return => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const dispatchApp: AppDispatch = useDispatch();
  const { userToken, refreshToken } = useTypedSelector((state) => state.auth);
  const [successType, setSuccessType] = useState<SuccessType>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const isLoading = useTypedSelector(
    (state) => state.auth.dataStatus === DataStatus.PENDING,
  );
  useEffect(() => {
    if (authError) {
      const timer = setTimeout(() => {
        setAuthError(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  useEffect(() => {
    if (userToken && refreshToken) {
      dispatchApp(getUserData());
    }
  }, [dispatchApp, refreshToken, userToken]);

  const setCurrentForm = useCallback((form: FormType) => {
    setAuthError(null);
    dispatch({ type: AuthAction.SET_FORM, payload: form });
  }, []);

  const onLoginFormSubmit = async (loginFormValue: LoginFormDto) => {
    setAuthError(null);
    const val: LoginFormDto = {
      email: loginFormValue.email,
      password: loginFormValue.password,
    };

    try {
      const result = await dispatchApp(getCredentials(val)).unwrap();
      if (!result) {
        return;
      }
      setSuccessType(FormEnum.LOGIN);
      dispatch({
        type: AuthAction.RESET_FORM,
      });
    } catch (error) {
      setAuthError('Incorrect e-mail or password');
    }
  };

  const onLoginPermissionFormSubmit = async (
    loginPermissionFormValue: LoginPermissionFormDto,
  ) => {
    const val: LoginPermissionFormDto = {
      fullName: loginPermissionFormValue.fullName,
      email: loginPermissionFormValue.email,
      password: loginPermissionFormValue.password,
    };

    const result = await dispatchApp(createUser(val)).unwrap();

    if (result) {
      setSuccessType('loginAdmin');
    }

    dispatch({
      type: AuthAction.LOGIN_PERMISSION_FORM,
      payload: loginPermissionFormValue,
    });

    dispatch({ type: AuthAction.RESET_FORM });
  };

  const onRegisterFormSubmit = async (registerFormValue: RegisterFormDto) => {
    const val: RegisterFormDto = {
      email: registerFormValue.email,
      password: registerFormValue.password,
      fullName: registerFormValue.fullName,
      phoneNumber: registerFormValue.phoneNumber,
    };

    const result = await dispatchApp(createUser(val)).unwrap();
    if (!result) {
      return;
    }

    setSuccessType(FormEnum.REGISTER);
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
    loginPermissionFormValue: state.loginPermissionFormValue,
    registerFormValue: state.registerFormValue,
    forgotFormValue: state.forgotFormValue,
    onLoginFormSubmit,
    onLoginPermissionFormSubmit,
    onRegisterFormSubmit,
    onForgotFormSubmit,
    successType,
    setSuccessType,
    isLoading,
    authError,
  };
};

export { useAuth };
