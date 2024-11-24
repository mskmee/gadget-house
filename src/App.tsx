import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './styles/globals.scss';
import { StorageProvider } from './providers/providers';

function App() {
  return (
    <StorageProvider>
      <RouterProvider router={routes} />
    </StorageProvider>
  );
}

export default App;
