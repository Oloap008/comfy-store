import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";

import { ErrorElement } from "./components";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleProductLoader } from "./pages/SingleProduct";
import { loader as productsLoader } from "./pages/Products";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        errorElement: <ErrorElement />,
        loader: landingLoader,
        element: <Landing />,
      },
      {
        path: "products",
        loader: productsLoader,
        errorElement: <ErrorElement />,
        element: <Products />,
      },
      {
        path: "products/:id",
        loader: singleProductLoader,
        errorElement: <ErrorElement />,
        element: <SingleProduct />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </Provider>
  );
}

export default App;
