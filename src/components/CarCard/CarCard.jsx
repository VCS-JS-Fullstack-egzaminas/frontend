import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

const CarCard = ({ car }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { id } = useParams();

  return (
    <div
      className={`car-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div className="car-card-inner">
        <div className="car-card-front">
          <img
            src={car.photos[0]}
            alt={car.title}
            style={{ width: "265px", height: "151px", objectFit: "contain" }}
          />
          <h2 className="text-xl font-bold">{car.title}</h2>
        </div>
        <div className="car-card-back p-4">
          <h2 className="text-xl font-bold mb-2">{car.title}</h2>
          <p className="flex items-center mb-2">
            <img
              src="../../public/icons/gas.png"
              alt=""
              className="w-6 h-6 mr-2"
            />
            {car.fuelType}
          </p>
          <p className="flex items-center mb-2">
            <img
              src="../../public/icons/gearbox.png"
              alt=""
              className="w-6 h-6 mr-2"
            />
            {car.transmission}
          </p>
          <p className="flex items-center mb-2">
            <img
              src="../../public/icons/price-tag-euro.png"
              alt=""
              className="w-6 h-6 mr-2"
            />
            {car.price}€
          </p>
          <Link to={`/car/${car._id}`} className="block mt-4">
            <button className="btn btn-primary">Find out more</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarCard;
