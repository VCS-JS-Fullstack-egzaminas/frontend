import { Helmet } from "react-helmet";
import { useEffect, useState, useRef } from "react";
import {
  getAllReservations,
  updateReservationById,
} from "../../../services/reservationsService";
import Button from "../../../components/ui/Button";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState([]);
  const [editId, setEditId] = useState("");
  const [notification, setNotification] = useState(null);
  const statusRef = useRef();

  useEffect(() => {
    const getReservations = async () => {
      try {
        const response = await getAllReservations();
        setReservations(response.data);
      } catch (error) {
        console.error("Error Fetching Reservation", error);
      }
    };
    getReservations();
  }, [showEdit]);

  const displayNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const status = e.target.value;
    setEditData({ status });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(editData, editId);
      await updateReservationById(editId, editData);
      displayNotification("success", "Record successfully updated!");
      setShowEdit(false);
    } catch (error) {
      displayNotification("error", "Error updating record!");
      console.log(error);
    }
  };
  return (
    <div>
      <Helmet>
        <title>Reservation</title>
      </Helmet>

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="max-w-screen-lg mx-auto bg-white shadow-md rounded-md p-8">
          {reservations.length > 0 ? (
            <div className="space-y-4">
              {reservations.map((info) => (
                <div
                  key={info._id}
                  className="bg-white shadow-md rounded-md p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 relative"
                >
                  <div className="details">
                  <img src={info.listing.photos} alt="car" className="w-32  top-6 right-6 rounded-md mb-8"/>
                    <p className="mb-2">
                      <strong> Listing: </strong>
                      {info.listing.title} <i>{info.listing.year}</i>
                    </p>
                    <p className="mb-2 break-words">
                      <strong>User:</strong> {info.user.email}
                    </p>
                    <p className="mb-2">
                      <strong>Start:</strong>{" "}
                      {new Date(info.start).toLocaleString()}
                    </p>
                    <p className="mb-2">
                      <strong>End:</strong>{" "}
                      {new Date(info.end).toLocaleString()}
                    </p>
                    <p className="mb-2 capitalize">
                      <strong>Status:</strong> {info.status}
                    </p>
                    <p className="mb-2">
                      <strong>Reservation created at:</strong>{" "}
                      {new Date(info.createdAt).toLocaleString()}
                    </p>
                    <p className="mb-2">
                      <strong>Reservation updated at:</strong>{" "}
                      {new Date(info.updatedAt).toLocaleString()}
                    </p>
                    <Button
                      color="blue"
                      onClick={() => {
                        setShowEdit(true);
                        setEditId(info._id);
                      }}
                    >
                      Change Status
                    </Button>
                    {notification && editId === info._id && (
                      <p
                        className={`mt-4 ${
                          notification.type === "success"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {notification.message}
                      </p>
                    )}
                  </div>
                  {editId === info._id && showEdit && (
                    <form onSubmit={handleUpdate} className="mt-4">
                      <div className="flex flex-col gap-2">
                        <select
                          onChange={(e) => handleInputChange(e)}
                          ref={statusRef}
                          value={editData.status}
                          className="w-full p-2 border border-gray-300 rounded capitalize"
                        >
                          <option hidden defaultValue={info.status}>
                            {info.status}
                          </option>
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Declined">Declined</option>
                        </select>
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No reservations available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
