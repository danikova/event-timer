import "./index.css";
import React from "react";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./lib/theme.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/event-horizon/",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </React.StrictMode>
);
