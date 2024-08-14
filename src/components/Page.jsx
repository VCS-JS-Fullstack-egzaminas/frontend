import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Page.css";

const cars = [
  {
    id: 1,
    imgSrc:
      "../../public/auto/Automobilio-nuoma-Toyota-Corolla-autonuoma-Vilniuje3-265x128.jpg",
    title: "Toyota Corolla",
    size: "Vidutinė (IDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 21.56€",
    reserve: "Rezervuoti",
  },
  {
    id: 2,
    imgSrc: "../../public/auto/Automobilio-nuoma-Volkswagen-Golf3-265x151.png",
    title: "Volkswagen Golf 3",
    size: "Kompaktinė (CDMR)",
    year: "metai: 2020",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 18.78€",
    reserve: "Rezervuoti",
  },
  {
    id: 3,
    imgSrc: "../../public/auto/Automobilio-nuoma-Volkswagen-Jetta-265x132.png",
    title: "Volkswagen Jetta",
    size: "Vidutinė (IDMR)",
    year: "metai: 2020",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 21.88€",
    reserve: "Rezervuoti",
  },
  {
    id: 4,
    imgSrc: "../../public/auto/Automobilio-nuoma-Volkswagen-Polo-265x149.png",
    title: "Volkswagen Polo",
    size: "Ekonominė",
    year: "metai: 2021",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 17,67€",
    reserve: "Rezervuoti",
  },
  {
    id: 5,
    imgSrc: "../../public/auto/Automobilių-nuoma-Ford-Focus3-265x144.png",
    title: "Ford Focus",
    size: "Kompaktinė (CWAR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 17.9€",
    reserve: "Rezervuoti",
  },
  {
    id: 6,
    imgSrc: "../../public/auto/Automobilių-nuoma-Ford-Mondeo.-265x153.png",
    title: "Ford Mondeo",
    size: "Standartinė (SDAR)",
    year: "metai: 2022",
    info: "Pavarų dėžė: Automatinė",
    price: "Kaina nuo: 29.22€",
    reserve: "Rezervuoti",
  },
  {
    id: 7,
    imgSrc: "../../public/auto/Automobilių-nuoma-Hyundai-i10-252x160.jpg",
    title: "Hyundai i10",
    size: "Mini (MDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 9.98€",
    reserve: "Rezervuoti",
  },
  {
    id: 8,
    imgSrc: "../../public/auto/hyundai-i20.png",
    title: "Hyundai i20",
    size: "Ekonominė",
    year: "metai: 2021",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 22.45€",
    reserve: "Rezervuoti",
  },
  {
    id: 9,
    imgSrc: "../../public/auto/Automobiliu-nuoma-Hyundai-i30.-265x138.jpg",
    title: "Hyundai i30",
    size: "Kompaktinė (CDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 18.88€",
    reserve: "Rezervuoti",
  },
  {
    id: 10,
    imgSrc:
      "../../public/auto/Automobiliu-nuoma-Toyota-Auris-autonuoma..-265x150.jpg",
    title: "Toyota Auris",
    size: "Kompaktinė (CDMR)",
    year: "metai: 2019",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 19.77€",
    reserve: "Rezervuoti",
  },
  {
    id: 11,
    imgSrc:
      "../../public/auto/Automobiliu-nuoma-Toyota-Avensis-autonuoma-265x130.jpg",
    title: "Toyota Avensis",
    size: "Standartinė (SWMR)",
    year: "metai: 2022",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 22.45€",
    reserve: "Rezervuoti",
  },
  {
    id: 12,
    imgSrc:
      "../../public/auto/Automobiliu-nuoma-Toyota-CHR-autonuoma.-265x156.jpg",
    title: "Toyota CHR",
    size: "Vidutinė (IFAR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: automatinė",
    price: "Kaina nuo: 25.98€",
    reserve: "Rezervuoti",
  },
  {
    id: 13,
    imgSrc:
      "../../public/auto/Automobiliu-nuoma-Toyota-Corolla-autonuoma-11-265x135.jpg",
    title: "Toyota Corolla",
    size: "Vidutinė (IWAR)",
    year: "metai: 2022",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 24.99€",
    reserve: "Rezervuoti",
  },
  {
    id: 14,
    imgSrc:
      "../../public/auto/Automobiliu-nuoma-Toyota-Yaris-autonuoma.-260x160.jpg",
    title: "Toyota Yaris",
    size: "Ekonominė",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 14.56€",
    reserve: "Rezervuoti",
  },
  {
    id: 15,
    imgSrc:
      "../../public/auto/car_group_2018-05-15-22-29-46_5afb5f5a2c54e-1-265x153.jpg",
    title: "Ford Focus",
    size: "Kompaktinė (CDAR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: automatinė",
    price: "Kaina nuo: 21.56€",
    reserve: "Rezervuoti",
  },
  {
    id: 16,
    imgSrc: "../../public/auto/Ford-Fiesta.png",
    title: "Ford Fiesta",
    size: "Ekonominė",
    year: "metai: 2020",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 17.67€",
    reserve: "Rezervuoti",
  },
  {
    id: 17,
    imgSrc: "../../public/auto/Ford-Focus-EU-1-265x151.png",
    title: "Ford Focus",
    size: "Kompaktinė (CDAR)",
    year: "metai: 2022",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 13,86€",
    reserve: "Rezervuoti",
  },
  {
    id: 18,
    imgSrc: "../../public/auto/Hyundai-i10.jpg",
    title: "Hyundai i10",
    size: "Mini (MDMR)",
    year: "metai: 2022",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 14.55€",
    reserve: "Rezervuoti",
  },
  {
    id: 19,
    imgSrc: "../../public/auto/VW-Taigo.jpg",
    title: "VW Taigo",
    size: "Kompaktinė (CFAR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: automatinė",
    price: "Kaina nuo: 24€",
    reserve: "Rezervuoti",
  },
  {
    id: 20,
    imgSrc: "../../public/auto/hyundai-i30.png",
    title: "Hyundai i30",
    size: "Kompaktinė (CDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 18.88€",
    reserve: "Rezervuoti",
  },
  {
    id: 21,
    imgSrc: "../../public/auto/hyundai-i40-265x111.png",
    title: "hyundai i40",
    size: "Standartinė (SWAR)",
    year: "metai: 2022",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 24.66€",
    reserve: "Rezervuoti",
  },
  {
    id: 22,
    imgSrc: "../../public/auto/i40-new-265x140.jpg",
    title: "hyundai i40 CW",
    size: "Standartinė (CWAR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: automatinė",
    price: "Kaina nuo: 24.66€",
    reserve: "Rezervuoti",
  },
  {
    id: 23,
    imgSrc: "../../public/auto/Mondeo.png",
    title: "Ford Mondeo",
    size: "Standartinė (CDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 27.55€",
    reserve: "Rezervuoti",
  },
  {
    id: 24,
    imgSrc: "../../public/auto/Toyota-Auris.jpg",
    title: "Toyota-Auris",
    size: "Kompaktinė (CDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 19.77€",
    reserve: "Rezervuoti",
  },
  {
    id: 25,
    imgSrc: "../../public/auto/Toyota-Corolla.jpg",
    title: "Toyota Corolla New",
    size: "Vidutinė (IDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 19.99€",
    reserve: "Rezervuoti",
  },
  {
    id: 26,
    imgSrc: "../../public/auto/toyota-rav4.jpg",
    title: "Toyota RAV 4",
    size: "Visureigis (FDAR)",
    year: "metai: 2021",
    info: "Pavarų dėžė: automatinė",
    price: "Kaina nuo: 29.99€",
    reserve: "Rezervuoti",
  },
  {
    id: 27,
    imgSrc: "../../public/auto/Volkswagen-Passsat.png",
    title: "Volkswagen Passsat",
    size: "Standartinė (SDMR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 26.56€",
    reserve: "Rezervuoti",
  },
  {
    id: 28,
    imgSrc: "../../public/auto/volkswagen-t-roc.jpg",
    title: "Volkswagen T-Roc A/T",
    size: "Vidutinė (IFAR)",
    year: "metai: 2023",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 28.88€",
    reserve: "Rezervuoti",
  },
  {
    id: 29,
    imgSrc: "../../public/auto/Volkswagen-Touran-.png",
    title: "Volkswagen Touran",
    size: "Vidutinė (IWMR)",
    year: "metai: 2019",
    info: "Pavarų dėžė: mechaninė",
    price: "Kaina nuo: 22.23€",
    reserve: "Rezervuoti",
  },
  {
    id: 30,
    imgSrc: "../../public/auto/VW-T-Cross.jpg",
    title: "VW-T-Cross",
    size: "Vidutinė (CFAR)",
    year: "metai: 2022",
    info: "Pavarų dėžė: automatinė",
    price: "Kaina nuo: 24€",
    reserve: "Rezervuoti",
  },
];

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

export default Page;
