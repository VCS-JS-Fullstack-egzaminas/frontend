import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
  deleteUserById,
  getUserById,
  updateUserById,
} from "../../../services/userService";

const UserDetails = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const emailRef = useRef();
  const usernameRef = useRef();

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await getUserById(id);
        setEntry(response.data);
      } catch (error) {
        console.error("Error Fetching Entry", error);
      }
    };
    getEntries();
  }, [entry, id]);

  const displayNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => navigate("/admin/users"), 3000);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteUserById(id);
      displayNotification("success", "User successfully deleted!");
    } catch (error) {
      displayNotification("error", "Error deleting user!");
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserById(id, editData);
      displayNotification("success", "Record successfully updated!");
      setShowEdit(false);
    } catch (error) {
      displayNotification("error", "Error updating record!");
      console.log(error);
    }
  };

  const handleInputChange = () => {
    const email = emailRef.current.value.trim();
    const username = usernameRef.current.value.trim();

    const updatedData = {};

    if (email.length >= 6 && email !== entry.email) {
      updatedData.email = email;
    }

    if (username.length >= 3 && username !== entry.username) {
      updatedData.username = username;
    }

    if (Object.keys(updatedData).length > 0) {
      setEditData((prevData) => ({
        ...prevData,
        ...updatedData,
      }));
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-bold mb-4">User Details</h2>
        <div className="mb-4">
          <p>
            <strong>Username:</strong> {entry.username}
          </p>
          <p>
            <strong>ID:</strong> {entry._id}
          </p>
          <p>
            <strong>Email:</strong> {entry.email}
          </p>
          <p>
            <strong>Role:</strong> {entry.role}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(entry.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {new Date(entry.updatedAt).toLocaleString()}
          </p>
        </div>

        <div className="flex space-x-4">
          <Button onClick={() => setShowEdit(true)}>Edit</Button>
          {entry.role === "user" && (
            <Button color="danger" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Button color="secondary" onClick={() => navigate("/admin/users")}>
            Back to Users
          </Button>
        </div>

        {showEdit && (
          <form className="mt-6" onSubmit={handleUpdate}>
            <h3 className="text-lg font-semibold mb-4">Edit Information</h3>
            <div className="mb-4">
              <label className="block mb-2">Username</label>
              <input
                ref={usernameRef}
                type="text"
                onChange={handleInputChange}
                placeholder={entry.username}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                ref={emailRef}
                type="email"
                onChange={handleInputChange}
                placeholder={entry.email}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={!editData.username && !editData.email}
                color={!editData.username && !editData.email ? "disabled" : "create"}
              >
                Submit
              </Button>
              <Button color="danger" onClick={() => setShowEdit(false)}>
                Close
              </Button>
            </div>
          </form>
        )}

        {notification && (
          <div
            className={`mt-6 p-4 rounded ${
              notification.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
