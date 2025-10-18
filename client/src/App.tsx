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
import Cabinet from "./routes/cabinet/Cabinet";
import CheckoutForm from "./routes/checkoutForm/CheckoutForm";
import OrderSummary from "./routes/order-summary/OrderSummary";
import PersonOrders from "./routes/personOrders/PersonOrders";
import OrderDetails from "./routes/order-details/OrderDetails";
import MyData from "./routes/my-data/MyData";
import NotFound from "./routes/not-found/NotFound";

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
          {
            path: "cabinet",
            element: <Cabinet />,
          },
          {
            path: "shipping-address-form",
            element: <CheckoutForm />,
          },
          {
            path: "order-summary",
            element: <OrderSummary />,
          },
          {
            path: "person_orders",
            element: <PersonOrders />,
          },
          {
            path: "person_orders/:orderId",
            element: <OrderDetails />,
          },
          {
            path: "my-data",
            element: <MyData />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
