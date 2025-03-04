import { Routes, Route } from "react-router-dom";
import Nav from "./components/common/nav/Nav";
import LoginPage from "./pages/LoginPage";
import HouseholdPage from "./pages/HouseholdPage";
import StockRecommendPage from "./pages/StockRecommendPage";
import StockDetailPage from "./pages/StockDetailPage";
import "./app.css";

// import "./axiosMock";

function App() {
  return (
    <div id="app">
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/household" element={<HouseholdPage />}></Route>
          <Route
            path="/stock/recommend"
            element={<StockRecommendPage />}
          ></Route>
          <Route path="/stock/:stockCode" element={<StockDetailPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
