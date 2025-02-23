import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./routes/home/Home";
import AddItemPage from "./routes/add-item/add-item";
import Register from "./routes/register/Register";
import Categories from "./routes/categories/categories";
import HydrationFallback from "./components/HydrationFallback";
import SingleProductPage from "./routes/singleProductPage/singleProduct";
import Login from "./routes/login/Login";
import PersistLogin from "./routes/login/PersistLogin";
import Cart from "./routes/cart/Cart";
import PaymentSuccessPage from "./routes/stripe/PaymentSuccessPage";
import Wishlist from "./routes/wishlist/Wishlist";

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
          },
          {
            path: "add-item",
            element: <AddItemPage />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "categories/:id",
            element: <SingleProductPage />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "success",
            element: <PaymentSuccessPage />,
          },
          {
            path: "wishlist",
            element: <Wishlist />,
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
