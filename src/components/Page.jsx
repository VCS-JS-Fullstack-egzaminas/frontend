import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Page.css";
import { cars } from "../data/mockdata";
import PropTypes from "prop-types";

const getRandomCars = (cars) => {
  const shuffled = cars.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const CarCard = ({ car, isFlipped, onClick }) => (
  <div className={`car-card ${isFlipped ? "flipped" : ""}`} onClick={onClick}>
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
        <p>{car.price}</p>
        <a href="/rezervuoti" className="btn btn-primary">
          {car.reserve}
        </a>
      </div>
    </div>
  </div>
);

const CarCarousel = ({ cars }) => {
  const [flippedCards, setFlippedCards] = useState({});
  const [randomCars, setRandomCars] = useState([]);

  useEffect(() => {
    setRandomCars(getRandomCars(cars));
  }, [cars]);

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.floor(1100 / 250),
    slidesToScroll: 1,
    nextArrow: <button className="slick-next">Next</button>,
    prevArrow: <button className="slick-prev">Prev</button>,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {randomCars.map((car) => (
          <div key={car.id} onClick={() => handleCardClick(car.id)}>
            <CarCard car={car} isFlipped={flippedCards[car.id]} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const Page = () => {
  return (
    <>
      <h1>Automobiliai nuomai</h1>
      <CarCarousel cars={cars} />
    </>
  );
};

Page.propTypes = {
  cars: PropTypes.array,
};

export default Page;
