import "./App.scss";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./pages/LoginPage/LoginPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import BudgetPage from "./pages/BudgetPage/BudgetPage";
import CalendarPage from "./pages/CalendarPage/CalendarPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Topbar />
        <Sidebar />
        <div className="app">
          <main className="content">
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            {/* -=-=-=-=-=-=-=-=-=-ROUTES-=-=-=-=-=-=-=-=- */}
            <BrowserRouter>
              <Routes>
                {/* HOME PAGE */}
                <Route path="/" element={<DashboardPage />} />

                {/* ROUTES */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/budget" element={<BudgetPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
