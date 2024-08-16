import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index/Index";
import NewListing from "./pages/NewListing/NewListing";
import Error from "./pages/Error/Error";
import ComponentsDemo from "./pages/ComponentsDemo/ComponentsDemo";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/new-listing",
        element: <NewListing />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dev/components-demo",
    element: <ComponentsDemo />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
