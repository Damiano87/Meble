import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./routes/home/Home";
import AddItemPage from "./routes/add-item/add-item";
import Register from "./routes/register/Register";
import { getCombinedLoader, getProductsLoader } from "./loaders/productsLoader";
import Categories from "./routes/categories/categories";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <div>Ładowanie...</div>,
    children: [
      {
        index: true,
        element: <Home />,
        loader: getCombinedLoader,
      },
      {
        path: "add-item",
        element: <AddItemPage />,
      },
      {
        path: "categories",
        element: <Categories />,
        loader: getProductsLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
