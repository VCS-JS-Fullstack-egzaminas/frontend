import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { cars } from "../../data/mockdata.json";
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
import { useAuth } from "../../hooks/useAuth";
import Card from "../../components/ui/Card";

const ReservationPage = () => {
  const { id } = useParams();
  // const car = cars.find((car) => car.id === parseInt(id));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [car, setCar] = useState(null);
  const [carLoading, setCarLoading] = useState(true);
  const [reservations, setReservations] = useState(null);
  const [datesToExclude, setDatesToExclude] = useState(null);
  const [maxEndDate, setMaxEndDate] = useState(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const getCarData = async () => {
      try {
        const listingResponse = await getListingById(id);

        if (user) {
          const reservationsResponse = await getReservationsByListingId(id);
          setReservations(reservationsResponse.data);
        }
        setCar(listingResponse.data);
        setCarLoading(false);
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
    } else {
      setEndDate(end);
    }
  };

  if (carLoading) {
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
      resetDatePicker();
      navigate("/my-reservations");
    } catch (error) {
      resetDatePicker();
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Helmet>
          <title>Reservation</title>
        </Helmet>
        <div className="flex justify-center">
          <div className="container px-6">
            <div className="car-detail-container">
              <div className="CarBox">
                <h2 className="text-left text-5xl mt-10 mb-5 text-ecstasy-500">
                  <strong>{car.title}</strong>
                </h2>
                <img
                  src={car.photos[0]}
                  alt={car.name}
                  className="car-detail-img mb-8"
                />
                <div className="bothBoxes">
                  <div className="carBoxTextOne flex gap-5 mt-5">
                    <p className="svgThree flex items-center gap-1 ">
                      <strong>
                        <img
                          className="svgColor"
                          width="25"
                          height="20"
                          src="https://img.icons8.com/ios-filled/50/expand--v1.png"
                          alt="expand--v1"
                        />
                      </strong>{" "}
                      {car.size}
                    </p>
                    <p className="svgThree flex items-center gap-1">
                      <img
                        className="svgColor"
                        width="25"
                        height="20"
                        src="https://img.icons8.com/ios-filled/50/gas-station.png"
                        alt="gas-station"
                      />{" "}
                      {car.fuelType}
                    </p>
                    <p className="svgThree flex items-center gap-1">
                      <strong>
                        <img
                          className="svgColor"
                          width="24"
                          height="24"
                          src="https://img.icons8.com/material-outlined/24/gearbox-selector.png"
                          alt="gearbox-selector"
                        />
                      </strong>{" "}
                      {car.transmission}
                    </p>
                    <p className="svgThree flex items-center gap-1">
                      <strong>
                        <img
                          className="svgColor"
                          width="25"
                          height="20"
                          src="https://img.icons8.com/ios/50/approval--v1.png"
                          alt="approval--v1"
                        />
                      </strong>{" "}
                      {car.available ? "Currently available" : "Unavailable"}
                    </p>
                  </div>
                  <div className="carBoxTextTwo flex gap-5 mt-2">
                    <p className="svgThree flex items-center gap-1">
                      <strong>
                        <img
                          className="svgColor"
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/50/calendar--v1.png"
                          alt="calendar--v1"
                        />
                      </strong>{" "}
                      {car.year}
                    </p>
                    <p className="svgThree flex items-center gap-1">
                      <strong>
                        <img
                          className="svgColor"
                          width="25"
                          height="25"
                          src="https://img.icons8.com/ios-filled/50/price-tag-euro.png"
                          alt="price-tag-euro"
                        />
                      </strong>{" "}
                      {car.price} <strong>€</strong>
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
                  <strong className="text-2xl mb-2">Extras Included:</strong>{" "}
                  {car.extras}
                </p>
                <p className="description">
                  <strong className="text-2xl mb-2">Description:</strong>{" "}
                  {car.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container px-6">
          {user ? (
            <>
              {car.available == true ? (
                <div className="flex justify-center my-12">
                  <Card className="min-w-[400px]">
                    <div className="">
                      <h2 className="text-center text-xl font-semibold">
                        Reserve {car.title} now!
                      </h2>
                      <div className="flex flex-col gap-4">
                        <div className="flex mt-6">
                          <DatePicker
                            selected={startDate}
                            onChange={onDatePickerChange}
                            startDate={startDate}
                            endDate={endDate}
                            minDate={new Date()}
                            maxDate={maxEndDate}
                            excludeDateIntervals={datesToExclude}
                            placeholderText="Select rental interval"
                            selectsRange
                            className="border w-[350px] outline-none rounded-md p-2 shadow-md text-center"
                            onClick={resetDatePicker}
                          />
                        </div>
                        <Button onClick={handleSubmit}>Reserve</Button>
                      </div>
                      {totalCost > 0 && (
                        <p id="costId">
                          <strong>Total Cost:</strong> {totalCost}
                          <strong> € </strong>
                        </p>
                      )}
                    </div>
                  </Card>
                </div>
              ) : (
                <h2 className="text-center text-xl font-semibold">
                  Sorry, this vehicle is currently unavailable
                </h2>
              )}
            </>
          ) : (
            <div className="flex justify-center my-12">
              <Card className="min-w-[400px]">
                <p className="text-xl">
                  You need to be{" "}
                  <Link
                    to="/auth/login"
                    className="font-bold text-ecstasy-500 underline hover:text-ecstasy-600 transition duration-150"
                  >
                    logged in
                  </Link>{" "}
                  to reserve {car.title}
                </p>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReservationPage;
