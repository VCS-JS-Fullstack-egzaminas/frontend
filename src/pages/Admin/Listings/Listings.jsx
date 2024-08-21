import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { getAllListings } from "../../../services/listingsService";
import { Helmet } from "react-helmet";

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
        <Helmet>
          <title>Listing</title>
        </Helmet>
        <h1 className="text-2xl font-bold mb-4">Listings</h1>
        <Link to="/admin/new-listing">
          <Button className="mb-6" color={"create"}>
            + New Listing
          </Button>
        </Link>
        {listings.length > 0 ? (
          <div className="space-y-4 flex flex-col justify-center items-center">
            {listings.map((info) => (
              <div
                key={info._id}
                className="bg-white shadow-md rounded-md p-6 flex flex-col justify-center items-center flex-wrap gap-4 w-fit justify-self-center md:flex md:flex-row md:justify-between md:w-full"
              >
                <div className="details">
                  <h2 className="text-xl font-semibold mb-2">{info.title}</h2>
                  <p className="mb-2">
                    <strong>Year:</strong> {info.year}
                  </p>
                  <p className="mb-2">
                    <strong>Size:</strong> {info.size}
                  </p>
                  <p className="mb-2">
                    <strong>Price from:</strong> {info.price} €
                  </p>
                  <p className="mb-4">
                    <strong>Availability:</strong>{" "}
                    {info.available ? "Currently available" : "Unavailable"}
                  </p>
                  <Link to={`${info._id}`}>
                    <Button>Details</Button>
                  </Link>
                </div>
                <div className="w-60">
                  <img src={`${info.photos}`} className="w-full" />
                </div>
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
