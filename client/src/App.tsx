import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./routes/home/home";
import AddItemPage from "./routes/add-item/add-item";
import Register from "./routes/register/Register";
import { getTopEightLoader } from "./loaders/productsLoader";
import Categories from "./routes/categories/categories";

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
        loader: getTopEightLoader,
      },
      {
        path: "add-item",
        element: <AddItemPage />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
