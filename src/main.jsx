import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoginPage from "./pages/login.jsx";
import CreateAnuncioPage from "./pages/createAnuncio.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/criar"} element={<CreateAnuncioPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
