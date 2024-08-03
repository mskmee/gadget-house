import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Smartphones from './pages/Smartphones/Smartphones';
import Laptops from './pages/Laptops/Laptops';
import Viewed from './pages/Viewed/Viewed';
import './styles/globals.css';
import AppRoute from './/routes/Route';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<Main />} />
        <Route path={AppRoute.SMARTPHONES} element={<Smartphones />} />
        <Route path={AppRoute.LAPTOPS} element={<Laptops />} />
        <Route path={AppRoute.VIEWED} element={<Viewed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
