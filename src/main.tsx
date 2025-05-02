import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import ukUA from 'antd/es/locale/uk_UA';

import { store } from '@/store';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        locale={ukUA}
        theme={{
          token: {
            colorPrimary: 'var(--theme-color)',
            fontFamily: 'Inter, sans-serif',
          },
          components: {
            DatePicker: {
              activeBorderColor: 'var(--theme-color)',
            },
          },
        }}
      >
        <App />
        <ToastContainer />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
);
