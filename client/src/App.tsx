import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./routes/home/home";
import AddItemPage from "./routes/add-item/add-item";
import Register from "./routes/register/Register";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "add-item",
        element: <AddItemPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
