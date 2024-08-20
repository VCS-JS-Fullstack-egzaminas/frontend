import { useState } from "react";
import PropTypes from "prop-types";

const CarCard = ({ car }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`car-card ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped((prev) => !prev)}
    >
      <div className="car-card-inner">
        <div className="car-card-front">
          <img src={car.imgSrc} alt={car.title} />
          <h2>{car.title}</h2>
        </div>
        <div className="car-card-back">
          <h2>{car.title}</h2>
          <p>{car.size}</p>
          <p>{car.year}</p>
          <p>{car.info}</p>
          <p>Price from: {car.price}€</p>
          <a href="/rezervuoti" className="btn btn-primary">
            {car.reserve}
          </a>
        </div>
      </div>
    </div>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    info: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    reserve: PropTypes.string.isRequired,
  }).isRequired,
};

export default CarCard;
