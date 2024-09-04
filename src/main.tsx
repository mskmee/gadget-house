// components
import App from './App';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
// utils
import { store } from '@/store/store';
import { createRoot } from 'react-dom/client';
// styles
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
);
