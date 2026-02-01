import { AppRoute } from '@/enums/enums';
/* eslint-disable no-unused-vars */
import {
  Reducer,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
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
import { useLocation, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { RoutePath } from '@/enums/Route';

type Return = {
  currentForm: FormEnum;
  setCurrentForm: (form: FormEnum) => void;
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
  switchAuthForm: (newForm: FormEnum) => void;
  authError: string | null;
};

type State = {
  currentForm: FormEnum;
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
      payload: FormEnum;
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
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const redirectPath = (location.state as any)?.from || '/';

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

  const setCurrentForm = useCallback((form: FormEnum) => {
    setAuthError(null);
    dispatch({ type: AuthAction.SET_FORM, payload: form });
  }, []);

  const onLoginFormSubmit = async (loginFormValue: LoginFormDto) => {
    setAuthError(null);
    try {
      const result = await dispatchApp(getCredentials(loginFormValue)).unwrap();
      if (!result) return;
      if (isMobile) navigate(redirectPath);
      else {
        setSuccessType(FormEnum.LOGIN);
        dispatch({ type: AuthAction.RESET_FORM });
      }
    } catch {
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
    try {
      const result = await dispatchApp(createUser(registerFormValue)).unwrap();
      if (!result) return;
      if (isMobile) navigate(redirectPath);
      else {
        setSuccessType(FormEnum.REGISTER);
        dispatch({ type: AuthAction.RESET_FORM });
      }
    } catch {
      setAuthError('Registration error');
    }
  };

  const onForgotFormSubmit = async (forgotFormValue: ForgotFormDto) => {
    try {
      const result = await dispatchApp(
        forgotPassword(forgotFormValue.email),
      ).unwrap();
      if (result) setSuccessType(FormEnum.FORGOT);
      dispatch({ type: AuthAction.FORGOT_FORM, payload: forgotFormValue });
      dispatch({ type: AuthAction.RESET_FORM });
    } catch {
      setAuthError('Forgot password error');
    }
  };

  const routeMap: Partial<Record<FormEnum, RoutePath>> = useMemo(() => {
    return {
      [FormEnum.LOGIN]: AppRoute.SIGN_IN,
      [FormEnum.REGISTER]: AppRoute.SIGN_UP,
      [FormEnum.FORGOT]: AppRoute.AUTH_FORGOT_PASSWORD,
      [FormEnum.CHANGE_PASSWORD]: AppRoute.AUTH_CHANGE_PASSWORD,
    };
  }, []);

  const switchAuthForm = useCallback(
    (newForm: FormEnum) => {
      if (isMobile) {
        const route = routeMap[newForm];
        if (route) navigate(route, { state: { from: redirectPath } });
      } else {
        setCurrentForm(newForm);
      }
    },
    [isMobile, navigate, redirectPath, setCurrentForm, routeMap], // добавили routeMap
  );

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
    switchAuthForm,
    authError,
  };
};

export { useAuth };
