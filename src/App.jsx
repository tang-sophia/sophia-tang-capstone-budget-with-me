import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Footer from "../src/components/Footer/Footer";
import Header from "../src/components/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<DashboardPage />} />

          {/* ROUTES */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
