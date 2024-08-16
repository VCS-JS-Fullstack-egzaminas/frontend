import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index/Index";
import NewListing from "./components/Admin/Listings/NewListing/NewListing";
import Error from "./pages/Error/Error";
import ComponentsDemo from "./pages/ComponentsDemo/ComponentsDemo";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ImageUpload from "./pages/ImageUpload/ImageUpload";
import AdminLayout from "./layouts/AdminLayout";
import Listings from "./components/Admin/Listings/Listings";
import Reservations from "./components/Admin/Reservations/Reservations";
import Users from "./components/Admin/Users/Users";

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
  {
    path: "/dev/image-upload-demo",
    element: <ImageUpload />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/listings",
        element: <Listings />,
        children: [
          {
            path: "/new-listing",
            element: <NewListing />,
          },
        ],
      },
      {
        path: "/reservations",
        element: <Reservations />,
      },
      {
        path: "/users",
        element: <Users />,
      },
    ],
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
