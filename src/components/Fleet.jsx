import React, { useState, useEffect } from "react";
import "./Fleet.css";
import { cars } from "../data/mockdata.json";

const Fleet = () => {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
   
    setCarList(cars);
  }, []);

  return (
    <>
      <div className="fleet-Container1">
        <h2>
          Discover the Perfect Ride: Introducing the VCS Fleet in Lithuania
        </h2>
      </div>
      <div className="fleet-Container2">
        {carList.map((car) => (
          <div key={car.id} className="fleet">
            <img src={car.imgSrc} alt={car.name} className="fleet-img" />
            <div className="fleet-details">
              <h3>{car.title}</h3>
              <p> {car.size}</p>
              <p>{car.year}</p>
              <p>{car.price}</p>
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
