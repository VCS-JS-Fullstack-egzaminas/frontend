import { useState, useEffect } from "react";
import "./Search.css";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Label from "./ui/Label";
import mockData from "../data/mockdata.json";
import Card from "./ui/Card";

const Search = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(""); // State to manage selected car

  useEffect(() => {
    setCars(mockData.cars);
  }, []);

  const handleCarSelect = (event) => {
    setSelectedCar(event.target.value);
  };

  return (
    <div className="search-main bg-black/20 bg-blend-darken flex justify-center">
      <div className="container px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
          <div className="grid gap-2 max-w-[320px] sm:max-w-[420px]">
            <h1 className="leading-none text-left font-extrabold text-white text-4xl sm:text-5xl">
              Drive in Style, Rent with Smiles
            </h1>
            <p className="text-lg sm:text-xl text-white">
              Our mission is simple - to provide you with top-tier car rental
              services.
            </p>
          </div>
          <Card className={"w-full"}>
            <div className="flex">
              <div className="flex flex-col gap-2">
                <div className="flex w-full flex-col">
                  <Label>Select a Car</Label>
                  <select
                    className="w-full bg-white border border-river-bed-50 rounded-md shadow-sm p-2 outline-none active:outline-1 focus:outline-1"
                    value={selectedCar}
                    onChange={handleCarSelect} 
                  >
                    <option value="" disabled>
                      --- Choose car ---
                    </option>
                    {cars.map((car) => (
                      <option key={car.id} value={car.id}>
                        {car.title} - {car.year} - {car.info} - {car.price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex flex-col sm:w-1/2">
                    <Label>Pick Up</Label>
                    <Input type="datetime-local" className="w-full" />
                  </div>
                  <div className="flex flex-col sm:w-1/2">
                    <Label>Drop Off</Label>
                    <Input type="datetime-local" className={"w-full"} />
                  </div>
                </div>
                <Button>Reserve</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Search;
