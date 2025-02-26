import { Routes, Route } from 'react-router-dom';
import Nav from './components/common/nav/Nav';
import LoginPage from './pages/LoginPage';
import HouseholdPage from './pages/HouseholdPage';
import StockRecommendPage from './pages/StockRecommendPage';
import StockDetailPage from './pages/StockDetailPage';

import './axiosMock';

function App() {
  return (
    <div id="app">
      <Nav />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/household" element={<HouseholdPage />}></Route>
        <Route path="/stock/recommend" element={<StockRecommendPage />}></Route>
        <Route path="/stock/:stockCode" element={<StockDetailPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
