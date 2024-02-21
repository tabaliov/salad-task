import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Root from "./routes/root";
import Salad from "./routes/Salad";
import Checkout from "./routes/Checkout";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/salad",
    element: <Salad />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
