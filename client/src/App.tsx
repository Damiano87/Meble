import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./routes/home/Home";
import AddItemPage from "./routes/add-item/add-item";
import Register from "./routes/register/Register";
import {
  getCombinedLoader,
  getProductsLoader,
  getSingleProductLoader,
} from "./loaders/productsLoader";
import Categories from "./routes/categories/categories";
import HydrationFallback from "./components/HydrationFallback";
import SingleProductPage from "./routes/singleProductPage/singleProduct";
import Login from "./routes/login/Login";
import PersistLogin from "./routes/login/PersistLogin";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    hydrateFallbackElement: <HydrationFallback />,
    children: [
      {
        element: <PersistLogin />,
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
          {
            path: "categories/:id",
            element: <SingleProductPage />,
            loader: getSingleProductLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
