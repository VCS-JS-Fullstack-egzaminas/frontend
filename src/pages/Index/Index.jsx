import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Index.css";
import { cars } from "../../data/mockdata.json";
import PropTypes from "prop-types";
import Search from "../../components/Search";
import CarCard from "../../components/CarCard/CarCard";

const getRandomCars = (cars) => {
  const shuffled = cars.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const CarCarousel = ({ cars }) => {
  const [randomCars, setRandomCars] = useState([]);

  useEffect(() => {
    setRandomCars(getRandomCars(cars));
  }, [cars]);

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
          <CarCard key={car.id} car={car} />
        ))}
      </Slider>
    </div>
  );
};

CarCarousel.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Index = () => (
  <>
    <Search />
    <h1>Automobiliai nuomai</h1>
    <CarCarousel cars={cars} />
  </>
);

export default Index;
