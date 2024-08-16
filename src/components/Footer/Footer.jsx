import { MdiCar } from "../ui/icons/MdiCar";

const Footer = () => {
  return (
    <footer className="flex justify-center bg-river-bed-800 text-white">
      <div className="container px-6 py-12">
        <div className="flex justify-between">
          <div className="">
            <div className="flex items-center gap-1">
              <MdiCar className="h-10 w-10 text-white" />
              <div className="flex flex-col items-center">
                <span className="text-2xl leading-none text-ecstasy-500">
                  index
                </span>
                <span className="text-lg text-white leading-none">rentals</span>
              </div>
            </div>
          </div>
          <div>
            <p>some text</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
