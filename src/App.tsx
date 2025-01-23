import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { ToasterProvider } from "@components/Toaster";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <ToasterProvider>
      <RouterProvider router={router} />
    </ToasterProvider>
  );
}

export default App;
