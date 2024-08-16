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
  const [entry, setEntry] = useState([]);
  const [show, setShow] = useState(false); //editinimo slepimui
  const [editData, setEditData] = useState("");
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

  // kad nesikabunciau prie sito delete :(
  const handleDelete = async (e) => {
    e.preventDefault(e);
    try {
      await deleteUserById(id);
      console.log("bando pasalinti", id);
      alert("Record succesfully deleted!");
    } catch (error) {
      console.log(error);
    }

    console.log("returning");
    navigate("/admin/users");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("cia paprasta", editData);
    try {
      await updateUserById(id, editData);
      console.log("bando atnaujinti", id);
      alert("Record succesfully updated!");
    } catch (error) {
      console.log(error);
    }

    console.log("returning");
    navigate(`/admin/users`);
    setShow(false);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    let laikinasEmail = emailRef.current.value;
    let laikinasUsername = usernameRef.current.value;
    if (laikinasEmail.length > 3 && laikinasUsername.length > 3) {
      setEditData({
        ...editData,
        email: laikinasEmail,
        username: laikinasUsername,
      });
    } else if (laikinasEmail.length > 3 && laikinasUsername.length < 3) {
      setEditData({ ...editData, email: laikinasEmail });
    } else if (laikinasUsername.length > 3 && laikinasEmail.length < 3) {
      setEditData({ ...editData, username: laikinasUsername });
    } //krc ims viena is dveju ant patcho jeigu nepildytas vienas
  };

  return (
    <div>
      <div className="entry-details">
        <div className="entry">
          <h2>Username:{entry.username}</h2>
          <h2>ID:{entry._id}</h2>
          <h2>Email:{entry.email}</h2>
          <h2>Role:{entry.role}</h2>
          <h2>Sukurtas:{entry.createdAt}</h2>
          <h2>Atnaujintas:{entry.updatedAt}</h2>

          <div className="entry-controls">
            <Button onClick={() => setShow(true)}>Edit</Button>
            <Button color="secondary" onClick={handleDelete}>
              Delete
            </Button>
            {show == true && (
              <form className="add-form" onSubmit={handleUpdate}>
                <h2>Change information:</h2>
                <label>Set username.</label>
                <input
                  ref={usernameRef}
                  type="text"
                  onChange={handleInputChange}
                  placeholder={entry.username}
                />
                <label>Set email.</label>
                <input
                  ref={emailRef}
                  type="email"
                  onChange={handleInputChange}
                  placeholder={entry.email}
                />
                <div className="edit-controls">
                  <Button type="submit">Submit </Button>
                  <Button
                    color="secondary"
                    onClick={() => setShow(false)}
                    style={{ backgroundColor: "darkRed" }}
                  >
                    Close
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
