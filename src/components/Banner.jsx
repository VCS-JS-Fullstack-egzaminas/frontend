import "./Banner.css";
const Banner = () => {
  return (
    <>
      <div className="flex items-center mt-24 bg-ecstasy-500 shadow-md">
        <div className="banner-img">
          <img src="../../public/final-1.webp" alt="" />
        </div>
        <div className="banner-message">
          <div className="text-white text-3xl">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <h3 className="font-bold text-4xl max-w-96 text-white">
            Drive in style, rent with a smile - that&apos;s the VCS Rental way.
          </h3>
          <p className="max-w-96 text-white/90">
            Premium Service - Competitive Pricing - Diverse Fleet Selection -
            Professional Excellence
          </p>
        </div>
      </div>
    </>
  );
};

export default Banner;
