import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { cars } from "../../data/mockdata.json";
import "./ReservationPage.css";
import { Helmet } from "react-helmet";
import { getListingById } from "../../services/listingsService";
import {
  createReservation,
  getReservationsByListingId,
} 
from "../../services/reservationsService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../components/ui/Button";

const ReservationPage = () => {
  const { id } = useParams();
  // const car = cars.find((car) => car.id === parseInt(id));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState(null);
  const [datesToExclude, setDatesToExclude] = useState(null);
  const [maxEndDate, setMaxEndDate] = useState(null);

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
    }

    getCarData();
  }, [id])

  useEffect(() => {
    if (reservations) {
      setDatesToExclude(
        reservations.map((res) => {
          const start = new Date(res.start);
          const end = new Date(res.end);

          return {
            start: start,
            end: end,
          }
        })
      )
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
    } else {
      setEndDate(end);
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

  const calculateTotalCost = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const cost = daysDiff * car.price;
    setTotalCost(cost);
  };

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
          <div className="CarBox">
          <h2 className="text-left text-5xl mt-10 mb-5 text-ecstasy-500">
              <strong>{car.title}</strong>
          </h2>
          <img src={car.photos[0]} alt={car.name} className="car-detail-img mb-8" />
          <div className="bothBoxes">
          <div className="carBoxTextOne flex gap-5 mt-5">
          <p className="svgThree flex items-center gap-1 ">
              <strong><img className="svgColor" width="25" height="20"  src="https://img.icons8.com/ios-filled/50/expand--v1.png" alt="expand--v1"/></strong> {car.size}
            </p>
          <p className="svgThree flex items-center gap-1">
          <img className="svgColor" width="25" height="20"  src="https://img.icons8.com/ios-filled/50/gas-station.png" alt="gas-station"/> {car.fuelType}
            </p>
            <p className="svgThree flex items-center gap-1">
              <strong><img className="svgColor" width="24" height="24" src="https://img.icons8.com/material-outlined/24/gearbox-selector.png" alt="gearbox-selector"/></strong> {car.transmission}
            </p>
            <p className="svgThree flex items-center gap-1" >
              <strong><img className="svgColor" width="25" height="20" src="https://img.icons8.com/ios/50/approval--v1.png" alt="approval--v1"/></strong>{" "}
              {car.available ? "Currently available" : "Unavailable"}
            </p>
            </div>
            <div className="carBoxTextTwo flex gap-5 mt-2">
            <p className="svgThree flex items-center gap-1">
              <strong><img className="svgColor" width="25" height="25" src="https://img.icons8.com/ios-filled/50/calendar--v1.png" alt="calendar--v1"/></strong> {car.year}
            </p>
            <p className="svgThree flex items-center gap-1">
              <strong><img className="svgColor" width="25" height="25" src="https://img.icons8.com/ios-filled/50/price-tag-euro.png" alt="price-tag-euro"/></strong> {car.price} <strong>€</strong>
            </p>
            <p className="svgThree">
              <strong>Min Duration:</strong> {car.min_duration} day
            </p>
            <p className="svgThree">
              <strong>Max Duration:</strong> {car.max_duration} day
            </p>
            </div>
            </div>
            </div>

            
            
          <div className="DescriptionContainer">
            <p className="description">
              <strong className="text-2xl mb-2">Extras Included:</strong> {car.extras}
            </p>
              <p className="description" >
                <strong className="text-2xl mb-2">Description:</strong> {car.description}
              </p>
          </div>
        </div>
      </div>
      {car.available == true ?
      <div className="reservationForm">
        <h2 className="text-center text-xl font-semibold">
          Choose the duration of your rental:
        </h2>
        <div className="flex gap-4">
          <DatePicker
            selected={startDate}
            onChange={onDatePickerChange}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            maxDate={maxEndDate}
            excludeDateIntervals={datesToExclude}
            placeholderText="Select a date other than the interval from 5 days ago to 5 days in the future"
            selectsRange
          />
          <Button type="button" onClick={resetDatePicker}>
            Reset
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <button onClick={calculateTotalCost}>Calculate Cost</button>
        {totalCost > 0 && (
          <p id="costId">
            <strong>Total Cost:</strong> {totalCost}
            <strong> € </strong>
          </p>
        )}
      </div>
            : 
            <h2 className="text-center text-xl font-semibold">Sorry, this vehicle is currently unavailable</h2>}
    </>
      
  );
};

export default ReservationPage;