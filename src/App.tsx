import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { ToasterProvider } from "@components/Toaster";
import { store } from "@/services/ducks/store.ts";
import { Provider } from "react-redux";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <ToasterProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ToasterProvider>
  );
}

export default App;
