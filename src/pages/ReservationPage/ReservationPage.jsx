import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ReservationPage.css";
import { Helmet } from "react-helmet";
import { getListingById } from "../../services/listingsService";
import {
  createReservation,
  getReservationsByListingId,
} from "../../services/reservationsService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/ui/Button";

const ReservationPage = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState(null);
  const [datesToExclude, setDatesToExclude] = useState(null);
  const [maxEndDate, setMaxEndDate] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const getCarData = async () => {
      try {
        const listingResponse = await getListingById(id);
        const reservationsResponse = await getReservationsByListingId(id);
        setCar(listingResponse.data);
        setReservations(reservationsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getCarData();
  }, [id]);

  useEffect(() => {
    if (reservations) {
      setDatesToExclude(
        reservations.map((res) => {
          const start = new Date(res.start);
          const end = new Date(res.end);

          return {
            start: start,
            end: end,
          };
        })
      );
    }
  }, [reservations]);

  const onDatePickerChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);

    if (start) {
      const nextReservation = reservations.find(
        (res) => new Date(res.start) > start
      );

      const calculatedMaxEndDate = nextReservation
        ? new Date(
            new Date(nextReservation.start).getTime() - 24 * 60 * 60 * 1000
          )
        : null;

      setMaxEndDate(calculatedMaxEndDate);

      if (end && calculatedMaxEndDate && end > calculatedMaxEndDate) {
        setEndDate(calculatedMaxEndDate);
      } else {
        setEndDate(end);
      }

      if (end) {
        const timeDiff = end - start;
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const cost = daysDiff * car.price;
        setTotalCost(cost);
      } else {
        setTotalCost(0);
      }
    } else {
      setEndDate(end);
      setTotalCost(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-353px)] bg-neutral-200 animate-pulse flex justify-center items-center"></div>
    );
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  const resetDatePicker = () => {
    setStartDate(null);
    setEndDate(null);
    setTotalCost(0);
    setMaxEndDate(null);
  };

  const handleSubmit = async () => {
    try {
      await createReservation({ listing: id, start: startDate, end: endDate });
      alert("SUCCESS");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Reservation</title>
        </Helmet>
        <div className="car-detail-container">
          <div className="car-detail-img-container">
            <img
              src={car.photos[0]}
              alt={car.name}
              className="car-detail-img"
            />
          </div>
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
            <button
              className="toggle-description-btn"
              onClick={() => setShowDescription(!showDescription)}
            >
              {showDescription ? "Hide Description" : "Show Description"}
            </button>
            {showDescription && (
              <p className="car-description">
                <strong>Description:</strong> {car.description}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="reservationForm">
        <h2 className="text-center text-xl font-semibold">
          Choose the duration of your rental:
        </h2>
        <div className="flex gap-4 align-center">
          <DatePicker
            selected={startDate}
            onChange={onDatePickerChange}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            maxDate={maxEndDate}
            excludeDateIntervals={datesToExclude}
            placeholderText="Select from-to dates"
            selectsRange
          />
          <Button type="button" onClick={resetDatePicker}>
            Reset
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        {totalCost > 0 && (
          <div className="total-cost-container">
            <p id="costId">
              <strong>Total Cost:</strong> {totalCost} <strong>€</strong>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ReservationPage;
