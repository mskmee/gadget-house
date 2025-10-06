// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useMediaQuery } from 'react-responsive';
// import { useActions } from '@/hooks/useActions';
// import { AppRoute } from '@/enums/Route';

// export type AuthRequiredType = 'review' | 'favorite';

// export const useAuthRequired = () => {
//   const { setRedirectPath } = useActions();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

//   const [isAuthRequiredModalOpen, setIsAuthRequiredModalOpen] = useState(false);
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [authRequiredType, setAuthRequiredType] =
//     useState<AuthRequiredType>('favorite');

//   const openAuthRequired = (type: AuthRequiredType) => {
//     setAuthRequiredType(type);
//     setIsAuthRequiredModalOpen(true);
//   };

//   const handleAuthLoginRedirect = () => {
//     setRedirectPath(location.pathname);
//     setIsAuthRequiredModalOpen(false);

//     if (isMobile) {
//       navigate(AppRoute.SIGN_IN);
//     } else {
//       setIsAuthModalOpen(true);
//     }
//   };

//   const handleAuthRegisterRedirect = () => {
//     setRedirectPath(location.pathname);
//     setIsAuthRequiredModalOpen(false);

//     if (isMobile) {
//       navigate(AppRoute.SIGN_UP);
//     } else {
//       setIsAuthModalOpen(true);
//       window.dispatchEvent(new CustomEvent('open-register'));
//     }
//   };

//   return {
//     openAuthRequired,
//     isAuthRequiredModalOpen,
//     setIsAuthRequiredModalOpen,
//     isAuthModalOpen,
//     setIsAuthModalOpen,
//     authRequiredType,
//     handleAuthLoginRedirect,
//     handleAuthRegisterRedirect,
//   };
// };
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  openAuthRequired,
  AuthRequiredType,
} from '@/store/auth/authPortalsSlice';

export const useAuthRequired = () => {
  const dispatch: AppDispatch = useDispatch();

  const triggerAuthRequired = (type: AuthRequiredType) => {
    dispatch(openAuthRequired(type));
  };

  return { triggerAuthRequired };
};
