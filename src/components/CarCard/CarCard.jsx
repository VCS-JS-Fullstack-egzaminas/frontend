import { useState } from "react";
import PropTypes from "prop-types";
import { Link,useParams } from "react-router-dom";

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
          <img src={car.photos[0]} alt={car.title} />
          <h2>{car.title}</h2>
        </div>
        <div className="car-card-back">
          <h2>{car.title}</h2>
          <p>{car.size}</p>
          <p>{car.year}</p>
          <p>{car.info}</p>
          <p>Price from: {car.price}€</p>
       <Link to={`/car/${car._id}`} >  <button className="btn btn-primary"> </button>
            {car.reserve}
            </Link>
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
