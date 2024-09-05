import App from './App';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import { ToastContainer } from 'react-toastify';
import { store } from '@/store/store';
import { createRoot } from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </StrictMode>,
);
