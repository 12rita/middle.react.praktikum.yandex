import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "@/services";
import { ToasterProvider } from "@components/Toaster";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ToasterProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ToasterProvider>
    </Router>
  </React.StrictMode>,
);
