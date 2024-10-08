import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Index.css";
import { cars as mockCars } from "../../data/mockdata.json";
import PropTypes from "prop-types";
import Search from "../../components/Search";
import CarCard from "../../components/CarCard/CarCard";
import Button from "../../components/ui/Button";
import Banner from "../../components/Banner";
import Comentators from "../../components/Comentators";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { getAllListings } from "../../services/listingsService";

const getRandomCars = (cars) => {
  const shuffled = cars.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

const CarCarousel = () => {
  const [randomCars, setRandomCars] = useState([]);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getAllListings();
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings", error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const combinedCars = [...listings];
    setRandomCars(getRandomCars(combinedCars));
  }, [listings]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.floor(1300 / 250),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    arrows: false,
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
    <div className="flex flex-col items-center justify-center my-24 ">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container px-6">
        <h2 className="font-bold text-4xl text-left text-river-bed-800 max-w-[450px] mb-12">
          Popular cars
        </h2>
      </div>
      <Slider {...settings} className="carousel-container ">
        {randomCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </Slider>
      <div className="flex mt-46">
        <div className="flex justify-center mt-24">
          <Link to={"/fleet"}>
            <Button>See Entire Fleet</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

CarCarousel.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const Index = () => (
  <>
    <Search />
    <CarCarousel cars={mockCars} />
    <Banner />
    <Comentators />
  </>
);

export default Index;
