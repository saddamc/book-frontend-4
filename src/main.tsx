import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import router from "./routes/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
