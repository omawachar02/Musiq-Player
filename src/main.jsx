import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { MusicPlayerProvider } from "./context/MusicPlayerContext";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MusicPlayerProvider>
      <App />
    </MusicPlayerProvider>
  </StrictMode>
);