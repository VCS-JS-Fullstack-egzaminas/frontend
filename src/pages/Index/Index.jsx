import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Index.css";
import { cars } from "../../data/mockdata.json";
import PropTypes from "prop-types";
import Search from "../../components/Search";
import CarCard from "../../components/CarCard/CarCard";
import Button from "../../components/ui/Button";
import Banner from "../../components/Banner";
import Comentators from "../../components/Comentators";


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
    infinite: true,
    speed: 500,
    slidesToShow: Math.floor(1300 / 250),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: Math.floor(1200 / 250),
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: true,
        },
      },
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: Math.floor(900 / 250),
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: Math.floor(600 / 250),
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: true,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: Math.floor(400 / 250),
          slidesToScroll: 1,
          infinite: true,
          centerMode: false,
          dots: true,
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
    <div className="toCars">
      <h3>
        At VCS Rentals, our mission is simple – to provide you with top-tier car
        rental services.
      </h3>
      <a href="/fleet">
      <Button>See entire fleet</Button>
      </a>
    </div>
    <CarCarousel cars={cars} />
    <Banner />
    <Comentators />
  </>
);

export default Index;
