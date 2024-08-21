import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { getAllListings } from "../../../services/listingsService";
import { Helmet } from "react-helmet";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const searchRef = useRef();

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error Fetching Entries", error);
      }
    };
    getEntries();
  }, []);

  const filterListings = useCallback(
    (searchTerm, availabilityFilter) => {
      return listings.filter((listing) => {
        const matchesSearch = searchTerm
          ? listing.title.toLowerCase().includes(searchTerm)
          : true;
        const matchesAvailability =
          availabilityFilter === "all"
            ? true
            : listing.available === (availabilityFilter === "available");

        return matchesSearch && matchesAvailability;
      });
    },
    [listings]
  );

  const handleSearch = () => {
    const searchTerm = searchRef.current.value.toLowerCase();
    setSearchResults(filterListings(searchTerm, availabilityFilter));
  };

  const handleAvailabilityChange = (filter) => {
    setAvailabilityFilter(filter);
    const searchTerm = searchRef.current.value.toLowerCase();
    setSearchResults(filterListings(searchTerm, filter));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Helmet>
          <title>Listings</title>
        </Helmet>
        <h1 className="text-2xl font-bold mb-4">Listings</h1>
        <div className="flex justify-between gap-6 mb-6 flex-wrap">
          <Link to="/admin/new-listing">
            <Button className="w-56" color={"create"}>
              + New Listing
            </Button>
          </Link>
          <div className="flex gap-4 items-center flex-wrap">
            <Button
              color={availabilityFilter === "all" ? "blue" : "gray"}
              onClick={() => handleAvailabilityChange("all")}
            >
              All
            </Button>
            <Button
              color={availabilityFilter === "available" ? "blue" : "gray"}
              onClick={() => handleAvailabilityChange("available")}
            >
              Available
            </Button>
            <Button
              color={availabilityFilter === "unavailable" ? "blue" : "gray"}
              onClick={() => handleAvailabilityChange("unavailable")}
            >
              Unavailable
            </Button>
          </div>
          <input
            type="text"
            placeholder="Type to search by car name"
            className="border border-gray-300 rounded-md p-2 w-96"
            onInput={handleSearch}
            ref={searchRef}
          />
        </div>
        {searchResults.length > 0 ? (
          <div className="space-y-4 flex flex-col justify-center items-center">
            {searchResults.map((info) => (
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
