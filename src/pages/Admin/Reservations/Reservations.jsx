import { Helmet } from "react-helmet";
import { useEffect,  useState, useRef  } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getAllReservations, updateReservationById}
 from "../../../services/reservationsService";

const Reservations = () => {
  const [reservations, setReservations] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [editId, setEditId] = useState('')
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
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
  }, []); //isveda visus reservations
  
  const displayNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => navigate("/admin/reservations"), 3000);
  }; 

  const handleInputChange = (e) => {
    e.preventDefault(e)
    const status = e.target.value
    setEditData({status});
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(editData,editId)
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

      <div>
      {reservations.length > 0 ? (
          <div className="space-y-4 flex flex-col justify-center items-center">
            {reservations.map((info) => (
              <div
                key={info._id}
                className="bg-white shadow-md rounded-md p-6 flex flex-col justify-center items-center flex-wrap gap-4 w-fit justify-self-center md:flex md:flex-row md:justify-between md:w-full">
                <div className="details">
                  <h2 className="text-xl font-semibold mb-2">Listing: {info.listing}</h2>
                  <p value={info._id}>{info._id}</p>
                  <p className="mb-2">
                    <strong>User:</strong> {info.user}
                  </p>
                  <p className="mb-2">
                  <strong>Start:</strong>{" "}
                  {new Date(info.start).toLocaleString()}
                  </p>
                  <p className="mb-2">
                  <strong>End:</strong> {" "}
                  {new Date(info.end).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Status:</strong> {info.status} 
                  </p>
                  <button onClick={() => {
                            setShowEdit(true);
                             setEditId(info._id);
                             }}>Edit</button>
                  <p className="mb-2">
                    <strong>Reservation created at:</strong> 
                    {" "}
                  {new Date(info.createdAt).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Reservation updated at:</strong> 
                    {" "}
                    {new Date(info.updatedAt).toLocaleString()}
                  </p>
              
                </div>
                {showEdit && (

    <form onSubmit={handleUpdate}>
      <div>
      <select
      ref={statusRef}
      onChange={(e) => handleInputChange(e)}>
      <option  hidden defaultValue={info.status}>{info.status}</option>
      <option value="Pending">Pending</option>
      <option value="Accepted">Accepted</option>
      <option value="Declined">Declined</option>
      </select>
      </div>
      <button type="submit">Submit</button>
      </form>
        )}
              </div>
              
            ))} </div>
             
        ) : (
          <p>No reservations available.</p>
        )}
      </div>
    </div>
  );
}

export default Reservations
