import "./App.scss";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Topbar from "./components/Topbar/Topbar";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Topbar />
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
              </Routes>
            </BrowserRouter>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
