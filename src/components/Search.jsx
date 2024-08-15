import  { useState, useEffect } from "react";
import "./Search.css";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import mockData from "../data/mockdata.json";

const Search = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    setCars(mockData.cars);
  }, []);

  return (
    <div className="search-main">
      <h1>Drive in style, Rent with smiles</h1>
      <div className="banner-container">
        <div className="banner-form">
          <div className="choose-car">
            <Label className="car-label">Select a Car</Label>
            <select className="car-dropdown">
              <option value="" disabled selected>
                --- Choose car ---
              </option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.title} - {car.year} - {car.info} - {car.price}
                </option>
              ))}
            </select>
          </div>
          <div className="dates">
            <Label className="date-label">Pick Up/Drop Off Date and Time</Label>
            <Input type="datetime-local" className="date-input"></Input>
            <span className="date-icon">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <Input type="datetime-local" className="date-input"></Input>
          </div>

          <Button>reserve</Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
