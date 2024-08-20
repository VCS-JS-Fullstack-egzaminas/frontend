import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card"; // Import Card component
import { getAllUsers } from "../../../services/userService";
import { Helmet } from "react-helmet";

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
  }, []);

  return (
    <div className="App bg-gray-100">
      <Helmet>
        <title>Users</title>
      </Helmet>
      <div className="home-content space-y-4 pt-8 mx-4">
        {content.length > 0 &&
          content.map((info) => (
            <Card key={info._id} className="recordInfo w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold mb-2">
                    <strong>Username:</strong> {info.username}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {info.email}
                  </p>
                </div>
                <Link to={`${info._id}`}>
                  <Button color="primary">Details</Button>
                </Link>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Users;
