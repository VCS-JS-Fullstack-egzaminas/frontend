import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ReservationPage.css";
import { Helmet } from "react-helmet";
import {
  getListingById,
} from "../../services/listingsService"

const ReservationPage = () => {
  const { id } = useParams();
  const [car,setCar] = useState("")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);


  useEffect(() => {
    const getEntries = async () => {
      try {
        const response = await getListingById(id);
        setCar(response.data);
      } catch (error) {
        console.error("Error Fetching Entry", error);
      }
    };
    getEntries();
  }, [id, car]);

  
  const calculateTotalCost = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const cost = daysDiff * car.price;
    setTotalCost(cost);
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Reservation</title>
        </Helmet>
        <div className="car-detail-container">
          <img src={car.photos} alt={car.title} className="car-detail-img" />
          <div className="car-detail-info">
            <h2>
              <strong>{car.title}</strong>
            </h2>
            <p>
              <strong>Size:</strong> {car.size}
            </p>
            <p>
              <strong>Year:</strong> {car.year}
            </p>
          <p>
            <strong>Size:</strong> {car.size}
          </p>
          <p>
              <strong>Description:</strong> {car.description}
            </p>
          <p>
            <strong>Fuel:</strong> {car.fuelType}
          </p>
          <p>
            <strong>Transmission:</strong> {car.transmission}
          </p>
          <p>
              <strong>Price:</strong> {car.price} <strong>€</strong>
            </p>

            <p>
            <strong>Availability:</strong>{" "}
            {car.available ? "Currently available" : "Unavailable"}
          </p>
          <p>
            <strong>Min Duration:</strong> {car.min_duration} days
          </p>
          <p>
            <strong>Max Duration:</strong> {car.max_duration} days
          </p>
          <p>
            <strong>Extras Included:</strong> {car.extras}
          </p>
          </div>
        </div>
        <div className="reservationForm">
          <h2 className="text-center">Choose your rental duration:</h2>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button onClick={calculateTotalCost}>Calculate Cost</button>
          {totalCost > 0 && (
            <p id="costId">
              <strong>Total Cost:</strong> {totalCost}
              <strong> € </strong>
            </p>
          )}
        </div>
      </div>
      <div className="reservationForm">
        <h2 className="text-center text-xl font-semibold">
          Choose the duration of your rental:
        </h2>
        <label className="font-medium">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label className="font-medium">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={calculateTotalCost}>Calculate Cost</button>
        {totalCost > 0 && (
          <p id="costId">
            <strong>Total Cost:</strong> {totalCost}
            <strong> € </strong>
          </p>
        )}
      </div>
    </>
  );
};
export default ReservationPage;
