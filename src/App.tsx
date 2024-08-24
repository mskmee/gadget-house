import { RouterProvider } from 'react-router-dom';
import { route } from './route';
import './styles/globals.css';

function App() {
  return <RouterProvider router={route} />;
}

export default App;
