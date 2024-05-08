import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Error from "./pages/Error";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      // errorElement: <Error />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
  ]);
  return <RouterProvider router={router} />;
}
