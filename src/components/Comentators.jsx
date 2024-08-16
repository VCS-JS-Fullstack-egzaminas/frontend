
import "./Comentators.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Comentators = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          centerMode: false,
        },
      },
      {
        breakpoint:1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          centerMode: false,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h2>Excellent service endorsed by our clients</h2>
      <Slider {...settings}>
        <div className="comentator1">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>Emily Carter</h3>
          <p>
            Renting from VCS Rentals was a breeze! The car was spotless and in
            perfect condition. The staff were incredibly helpful and made the
            entire process smooth and stress-free. I’ll definitely be using VCS
            Rentals for all my future rentals. Highly recommended!
          </p>
        </div>
        <div className="comentator2">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>Michael Bennett</h3>
          <p>
            Great experience overall with VCS Rentals. The booking process was
            straightforward, and the car was ready on time. The only minor issue
            was that the GPS was a bit outdated, but otherwise, everything was
            excellent. I would rent from them again.
          </p>
        </div>
        <div className="comentator3">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>Olivia Martin</h3>
          <p>
            VCS Rentals exceeded my expectations! The car I rented was in
            pristine condition and drove like a dream. The customer service was
            top-notch, and they even offered me a free upgrade. I couldn’t have
            asked for a better experience.
          </p>
        </div>
        <div className="comentator4">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>David Johnson</h3>
          <p>
            Quick and easy rental process with VCS Rentals. The car was clean
            and reliable, perfect for my weekend trip. The only downside was
            that the return location was a bit hard to find, but overall, a very
            positive experience. Will rent again.
          </p>
        </div>
        <div className="comentator5">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>Sarah Thompson</h3>
          <p>
            VCS Rentals made my trip to the city so much easier. The staff were
            friendly and efficient, and the car was in excellent condition. The
            rates were also very reasonable. I’ll definitely choose them for my
            next trip.
          </p>
        </div>
        <div className="comentator6">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>James Parker</h3>
          <p>
            I had a fantastic experience with VCS Rentals. The car was ready
            when I arrived, and the pick-up process was quick. The vehicle was
            in perfect condition and made my business trip hassle-free. I would
            highly recommend them!
          </p>
        </div>
        <div className="comentator7">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>Emily Carter</h3>
          <p>
            VCS Rentals provided excellent service from start to finish. The car
            was clean, modern, and exactly what I needed for my family vacation.
            The staff were courteous and helpful. I’ll definitely be renting
            from them again.
          </p>
        </div>
        <div className="comentator8">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>Daniel Lee</h3>
          <p>
            I’ve rented from several companies, but VCS Rentals stands out for
            their outstanding service and quality vehicles. The car was in great
            shape, and the rental process was quick and efficient. Highly
            recommend this company!
          </p>
        </div>
        <div className="comentator9">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>Jessica Brown</h3>
          <p>
            VCS Rentals made my weekend getaway stress-free. The car was
            spotless and ran smoothly, and the staff were friendly and
            accommodating. I’m very pleased with the service and will definitely
            rent from them again in the future.
          </p>
        </div>
        <div className="comentator10">
          <div className="message-star">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <img src="../../public/avatar.png" alt="" />
          <h3>William Davis</h3>
          <p>
            VCS Rentals delivered on all fronts. The car was ready on time,
            clean, and in excellent condition. The staff were professional and
            efficient, making the entire process seamless. I will definitely use
            VCS Rentals again for my next trip.
          </p>
        </div>
      </Slider>
    </div>
  );
};

export default Comentators;
