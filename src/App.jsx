import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index/Index";
import NewListing from "./pages/NewListing/NewListing";
import Error from "./pages/Error/Error";
import ComponentsDemo from "./pages/ComponentsDemo/ComponentsDemo";
import ImageUpload from "./pages/ImageUpload/ImageUpload";

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
    path: "/dev/components-demo",
    element: <ComponentsDemo />,
  },
  {
    path: "/dev/image-upload-demo",
    element: <ImageUpload />,
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
