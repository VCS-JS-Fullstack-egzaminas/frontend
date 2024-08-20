import { Helmet } from "react-helmet";

const AboutUs = () => {
  return (
    <div className="flex justify-center mt-[72px]">
      <div className="container px-6 my-12">
        <div className="boxas">
          <Helmet>
            <title>About</title>
          </Helmet>
          <h1 className="text-left font-bold text-3xl mb-6">About Us</h1>
          <h2 className="sr-only">About us</h2>
          <p className="mb-8 pl-6">
            Welcome to VCS Rentals, your trusted partner for all your car rental
            needs. Established with a commitment to providing exceptional
            service, VCS Rentals has grown to become a leading name in the car
            rental industry. Whether you&apos;re traveling for business,
            planning a family vacation, or need a vehicle for a special
            occasion, we&apos;re here to ensure you have a seamless and
            enjoyable experience.
          </p>
        </div>
        <div className="boxas">
          <h2 className="mb-4 font-semibold text-xl">Our Mission</h2>
          <p className="mb-8 pl-6">
            At VCS Rentals, our mission is simple: to deliver top-quality
            vehicles and outstanding customer service at competitive rates. We
            believe in making car rental easy, affordable, and accessible for
            everyone. Our fleet is diverse, offering everything from compact
            cars to luxury vehicles, all meticulously maintained to guarantee
            your safety and comfort.
          </p>
        </div>
        <div className="boxas">
          <h2 className="mb-4 font-semibold text-xl">Why Choose Us?</h2>
          <p className="mb-4 pl-6">
            <strong>Extensive Fleet:</strong> Our wide range of vehicles ensures
            that you&apos;ll find the perfect car to suit your needs, whether
            it&apos;s for a quick city trip or a long road journey.
          </p>
          <p className="mb-4 pl-6">
            <strong>Convenient Locations:</strong> With multiple locations
            across the region, picking up and dropping off your rental car is
            always convenient.
          </p>
          <p className="mb-4 pl-6">
            <strong>Customer-Centric Service:</strong> Our dedicated team is
            here to assist you every step of the way, from the moment you book
            until you return the vehicle.
          </p>
          <p className="mb-4 pl-6">
            <strong>Flexible Options:</strong> We offer flexible rental plans
            and competitive pricing, with no hidden fees. You can rent by the
            day, week, or month, depending on your needs.
          </p>
          <p className="mb-4 pl-6">
            <strong>Safety First:</strong> All our vehicles undergo rigorous
            inspections and regular maintenance to ensure they meet the highest
            safety standards.
          </p>
        </div>
        <div className="boxas">
          <h2 className="mb-4 font-semibold text-xl">Our Promise:</h2>
          <p className="mb-8 pl-6">
            We understand that your journey begins the moment you step into one
            of our cars. That&apos;s why we strive to provide not just a rental
            service, but a hassle-free experience that allows you to focus on
            what really matters—your destination. Thank you for choosing VCS
            Rentals. We look forward to being a part of your journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
