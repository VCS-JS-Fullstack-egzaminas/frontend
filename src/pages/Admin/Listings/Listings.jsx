import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { getAllListings } from "../../../services/listingsService";

const Listings = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data);
      } catch (error) {
        console.error("Error Fetching Entries", error);
      }
    };
    getEntries();
  }, [listings]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div>
        <h1 className="text-2xl font-bold mb-4">Listings</h1>
        <Link to="/admin/new-listing">
          <Button className="mb-6" color={"create"}>+ New Listing</Button>
        </Link>
        {listings.length > 0 ? (
          <div className="space-y-4">
            {listings.map((info) => (
              <div key={info._id} className="bg-white shadow-md rounded-md p-4">
                <h2 className="text-xl font-semibold mb-2">{info.title}</h2>
                <p className="mb-2">
                  <strong>Description:</strong> {info.description}
                </p>
                <p className="mb-2">
                  <strong>Photo:</strong>{" "}
                  {info.photos.join(", ")}
                </p>
                <p className="mb-2">
                  <strong>Price:</strong> {info.price} €
                </p>
                <p className="mb-2">
                  <strong>Availability:</strong>{" "}
                  {info.available ? "Currently available" : "Unavailable"}
                </p>
                <Link to={`${info._id}`}>
                  <Button>Details</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No listings available.</p>
        )}
      </div>
    </div>
  );
};

export default Listings;
