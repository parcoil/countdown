import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHead, UnheadProvider } from '@unhead/react/client';
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";

const head = createHead();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UnheadProvider head={head}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UnheadProvider>
  </StrictMode>
);
