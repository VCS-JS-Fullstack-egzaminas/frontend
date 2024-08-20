import "./Banner.css";
const Banner = () => {
  return (
    <>
      <div className="banner-container2 relative grid grid-cols-1 lg:grid-cols-3 items-center mt-24 bg-ecstasy-500 shadow-md">
        <img
          src="/final-1.webp"
          alt=""
          className="h-full w-full object-cover col-span-2"
        />
        {/* <div className="bg-red-500 h-full w-full flex col-span-2">zaza</div> */}
        <div className="banner-message flex flex-col gap-4 mx-16 my-12">
          <div className="text-white text-3xl">
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
            <span>&#9733;</span>
          </div>
          <h3 className="font-bold text-4xl max-w-96 text-white leading-none">
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
