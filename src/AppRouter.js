import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import App from './App';
import State from './State';
import Effect from './UseEffect1';
import ProductMain from './ProductMain';
import Review from './Review';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        
        <Route path="/app" element={<App />} />
        <Route path="/state" element={<State />} />
        <Route path="/effect" element={<Effect />} />
        <Route path="/product" element={<ProductMain />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;