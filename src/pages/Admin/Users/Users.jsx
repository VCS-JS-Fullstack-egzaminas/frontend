import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { getAllUsers } from "../../../services/userService";
const Users = () => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await getAllUsers();
        setContent(response.data);
      } catch (error) {
        console.error("Error Fetching Entries", error);
      }
    };
    getEntries();
  }, [content]);
  return (
    <div>
      <div className="App">
        <div className="new-listing-container card">
          {content.length > 0 &&
            content.map((info) => (
              <div key={info._id} className="recordInfo">
                <p>
                  {" "}
                  <strong>Username:</strong> {info.username}
                </p>
                <p>
                  <strong>Email:</strong> {info.email}
                </p>
                <Link to={`${info._id}`}>
                  {" "}
                  <Button>Details</Button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
