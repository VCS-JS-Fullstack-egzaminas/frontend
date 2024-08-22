import { useEffect, useState } from "react";
import Card from "../ui/Card";
import { MdiPencil } from "../ui/icons/MdiPencil";
import PropTypes from "prop-types";
import { MdiCheck } from "../ui/icons/MdiCheck";
import { MdiClose } from "../ui/icons/MdiClose";
import DatePicker from "react-datepicker";
import {
  deleteReservationById,
  getReservationsByListingId,
  updateReservationById,
} from "../../services/reservationsService";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";

const ReservationCarCard = ({ reservation }) => {
  const [editing, setEditing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datesToExclude, setDatesToExclude] = useState(null);
  const [maxEndDate, setMaxEndDate] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [currentReservation, setCurrentReservation] = useState(reservation);

  const navigate = useNavigate();

  useEffect(() => {
    const populateReservations = async () => {
      try {
        const response = await getReservationsByListingId(
          currentReservation.listing._id
        );
        setReservations(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (editing) {
      populateReservations();
    }
  }, [editing, currentReservation.listing._id]);

  useEffect(() => {
    if (reservations) {
      setDatesToExclude(
        reservations
          .filter((res) => res._id !== currentReservation._id)
          .map((res) => {
            const start = new Date(res.start);
            const end = new Date(res.end);

            return {
              start: start,
              end: end,
            };
          })
      );
    }
  }, [reservations, currentReservation._id]);

  const onDatePickerChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start) {
      const maxDuration =
        currentReservation.listing.max_duration * 24 * 60 * 60 * 1000; // Convert days to milliseconds
      const maxEndDateByDuration = new Date(start.getTime() + maxDuration);

      const nextReservation = reservations.find(
        (res) =>
          new Date(res.start) > start && res._id !== currentReservation._id
      );

      const calculatedMaxEndDate = nextReservation
        ? new Date(
            Math.min(
              new Date(nextReservation.start).getTime() - 24 * 60 * 60 * 1000,
              maxEndDateByDuration.getTime()
            )
          )
        : maxEndDateByDuration;

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

  const handleReservationUpdate = async () => {
    const response = await updateReservationById(currentReservation._id, {
      start: startDate,
      end: endDate,
      status: "Pending",
    });
    setCurrentReservation(response.data);
    setEditing(false);
  };

  const handleReservationDelete = async () => {
    try {
      if (confirm("Are you sure you want to cancel your reservation?")) {
        await deleteReservationById(currentReservation._id);
        navigate(0);
      }
    } catch (error) {
      console.error(error.message);
      alert("An unexpected error occured. Please try again later.");
    }
  };

  return (
    <Card
      className="px-0 py-0 w-full overflow-hidden max-w-[380px] mx-auto"
      key={currentReservation._id}
    >
      <div className="flex justify-center items-center border-b h-44">
        <img
          src={currentReservation.listing.photos[0]}
          alt={currentReservation.listing.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <p className="font-bold">{currentReservation.listing.title}</p>
        <p className="text-sm text-river-bed-600">
          {currentReservation.listing.year}
        </p>
        <div className="flex justify-between mt-2">
          <div className="flex gap-1">
            <p className="font-semibold">Dates:</p>
            {editing ? (
              <DatePicker
                selected={startDate}
                onChange={onDatePickerChange}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                maxDate={maxEndDate}
                excludeDateIntervals={datesToExclude}
                placeholderText="Select new rental interval"
                selectsRange
                className="max-w-[200px] border-none"
              />
            ) : (
              <>
                <p>
                  {new Date(currentReservation.start).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </p>
                <p> - </p>
                <p>
                  {new Date(currentReservation.end).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )}
                </p>
              </>
            )}
          </div>
          {editing ? (
            <div className="flex gap-1">
              <button
                className="text-river-bed-500 hover:text-green-500 transition duration-150"
                onClick={handleReservationUpdate}
              >
                <MdiCheck className="h-6 w-6" />
              </button>
              <button
                className="text-river-bed-500 hover:text-red-500 transition duration-150"
                onClick={() => setEditing(false)}
              >
                <MdiClose className="h-6 w-6" />
              </button>
            </div>
          ) : (
            <button
              className="text-river-bed-500 hover:text-river-bed-800 transition duration-150"
              onClick={() => setEditing(true)}
            >
              <MdiPencil className="h-6 w-6" />
            </button>
          )}
        </div>
        <div className="flex gap-1 mt-1">
          <p className="font-semibold">Status:</p>
          <p
            className={`capitalize text-white rounded-full px-2 py-0 ${
              currentReservation.status.toLowerCase() === "pending"
                ? "bg-ecstasy-500"
                : currentReservation.status.toLowerCase() === "accepted"
                ? "bg-green-600"
                : "bg-red-500"
            }`}
          >
            {currentReservation.status}
          </p>
        </div>
        <div className="flex mt-6">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700"
            onClick={handleReservationDelete}
          >
            Cancel reservation
          </Button>
        </div>
      </div>
    </Card>
  );
};

ReservationCarCard.propTypes = {
  reservation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    listing: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      available: PropTypes.bool.isRequired,
      min_duration: PropTypes.number,
      max_duration: PropTypes.number,
      extras: PropTypes.arrayOf(PropTypes.string),
      year: PropTypes.number.isRequired,
      size: PropTypes.string,
      transmission: PropTypes.string,
      fuelType: PropTypes.string,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    }).isRequired,
    user: PropTypes.string.isRequired,
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReservationCarCard;
