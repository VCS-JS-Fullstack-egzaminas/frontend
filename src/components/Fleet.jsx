import React, { useState, useEffect } from "react";
import "./Fleet.css";
import { cars } from "../data/mockdata.json";

const Fleet = () => {
  const [carList, setCarList] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    setCarList(cars);
    setFilteredCars(cars);
  }, []);

  const filterCars = (size) => {
    setFadeClass("fade-out");
    setTimeout(() => {
      if (size === "All") {
        setFilteredCars(carList);
      } else {
        const filtered = carList.filter((car) => car.size.includes(size));
        setFilteredCars(filtered);
      }
      setFadeClass("fade-in");
    }, 500);
  };

  return (
    <>
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
            <img src={car.imgSrc} alt={car.name} className="fleet-img" />
            <div className="fleet-details">
              <h3>{car.title}</h3>
              <p>{car.size}</p>
              <p>{car.year}</p>
              <p>Price from:{car.price}€</p>
              <a href="/rezervuoti" className="btn btn-primary">
                {car.reserve}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Fleet;
