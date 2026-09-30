import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import DocsPage from "./DocsPage.jsx";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeroUIProvider>
      <DocsPage />
    </HeroUIProvider>
  </React.StrictMode>
);
