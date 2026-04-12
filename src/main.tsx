import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./app/providers/AppContext";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
);
