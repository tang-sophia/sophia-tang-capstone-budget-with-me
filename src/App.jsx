import "./App.scss";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import Topbar from "./components/Topbar/Topbar";
import SidebarList from "./components/SidebarList/SidebarList";
import Footer from "./components/Footer/Footer";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SidebarList colorMode={colorMode.mode} theme={theme} />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
