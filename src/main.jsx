import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import Router from "./Route/Index.jsx";
import { Provider } from "react-redux";
import  { persistor ,store} from "../src/redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={Router}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </RouterProvider>
  </Provider>
);
