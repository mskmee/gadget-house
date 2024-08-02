import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Smartphones from './pages/Smartphones/Smartphones';
import Laptops from './pages/Laptops/Laptops';
import Viewed from './pages/Viewed/Viewed';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/smartphones" element={<Smartphones />} />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/viewed" element={<Viewed />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
