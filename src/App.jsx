import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index/Index";
import NewListing from "./pages/Admin/NewListing/NewListing";
import Error from "./pages/Error/Error";
import ComponentsDemo from "./pages/ComponentsDemo/ComponentsDemo";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ImageUpload from "./pages/ImageUpload/ImageUpload";
import AdminLayout from "./layouts/AdminLayout";
import Listings from "./pages/Admin/Listings/Listings";
import Reservations from "./pages/Admin/Reservations/Reservations";
import Users from "./pages/Admin/Users/Users";
import UserDetails from "./pages/Admin/UserDetails/UserDetails";
import ListingDetails from "./pages/Admin/ListingDetails/ListingDetails";

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
        path: "listings",
        element: <Listings />,
      },
      {
        path: "listings/:id",
        element: <ListingDetails />,
      },
      {
        path: "new-listing",
        element: <NewListing />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <UserDetails />,
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
