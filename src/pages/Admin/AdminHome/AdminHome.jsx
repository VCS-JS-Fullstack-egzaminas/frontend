import { Helmet } from "react-helmet";
const AdminHome = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <Helmet>
        <title>Admin</title>
      </Helmet>
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-ecstasy-500 mb-4">
          Welcome to Admin Home
        </h1>
        <p className="text-lg text-gray-700">
          Here you can manage users, listings, and reservations.
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
