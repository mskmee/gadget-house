import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './styles/globals.scss';
import { StorageProvider } from './providers/providers';

function App() {
  return (
    <StorageProvider>
      <RouterProvider router={routes} future={{ v7_startTransition: true }} />
    </StorageProvider>
  );
}

export default App;
