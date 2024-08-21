import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Fleet.css";
import { Helmet } from "react-helmet";
import { getAllListings } from "../services/listingsService";

const Fleet = () => {
  const [filteredCars, setFilteredCars] = useState([]);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await getAllListings();
        const combinedListings = [...response.data];
        setListings(combinedListings);
        setFilteredCars(combinedListings);
      } catch (error) {
        console.error("Error Fetching Entries", error);
      }
    };
    getEntries();
  }, []);

  const filterCars = (size) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      if (size === "All") {
        setFilteredCars(listings);
      } else {
        const filtered = listings.filter((car) => car.size.includes(size));
        setFilteredCars(filtered);
      }
      setFadeClass("fade-in");
    }, 500);
  };

  return (
    <>
      <Helmet>
        <title>All Fleet</title>
      </Helmet>
      <div className="fleet-Container1">
        <h2>
          Discover the Perfect Ride: Introducing the VCS Rental Fleet in
          Lithuania
        </h2>
        <div className="filter-buttons">
          <button onClick={() => filterCars("All")}>All</button>
          <button onClick={() => filterCars("Mini")}>Mini</button>
          <button onClick={() => filterCars("Economic")}>Economic</button>
          <button onClick={() => filterCars("Compact")}>Compact</button>
          <button onClick={() => filterCars("Medium")}>Medium</button>
          <button onClick={() => filterCars("Standard")}>Standard</button>
          <button onClick={() => filterCars("SUV")}>SUV</button>
        </div>
      </div>
      <div className={`fleet-Container2 ${fadeClass}`}>
        {filteredCars.map((car) => (
          <div key={car.id} className="fleet">
            <img src={car.photos[0]} alt={car.name} className="fleet-img" />
            <div className="fleet-details">
              <h3>{car.title}</h3>
              <div className="fleet-detail-columns">
                <div className="fleet-detail-column">
                  <div className="fleet-detail-item">
                    <img src="../../public/icons/expand.png" alt="" />
                    <p>{car.size}</p>
                  </div>
                  <div className="fleet-detail-item">
                    <img src="../../public/icons/calendar.png" alt="" />
                    <p>{car.year}</p>
                  </div>
                  <div className="fleet-detail-item">
                    <img src="../../public/icons/gearbox.png" alt="" />
                    <p>{car.transmission}</p>
                  </div>
                </div>
                <div className="fleet-detail-column">
                  <div className="fleet-detail-item">
                    <img src="../../public/icons/gas.png" alt="" />
                    <p>{car.fuelType}</p>
                  </div>
                  <div className="fleet-detail-item">
                    <img src="../../public/icons/price-tag-euro.png" alt="" />
                    <p>Price from: {car.price}€</p>
                  </div>
                </div>
              </div>
              <Link
                to={`/car/${car._id}`}
                className="btn btn-primary full-width"
              >
                Reserve
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Fleet;
