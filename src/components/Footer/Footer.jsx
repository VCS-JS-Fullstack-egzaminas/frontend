import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../Logos/Logo";

const Footer = () => {
  return (
    <footer className="bg-river-bed-800 text-white">
      <div className="flex justify-center border-river-bed-600 border-b">
        <div className="container px-6 py-12">
          <div className="md:flex grid gap-8 justify-center md:justify-between">
            <div className="flex items-start justify-center gap-1">
              <Logo color={"light"} className="h-20 w-full" />
            </div>
            <div className="flex flex-col ">
              <div className="text-center md:text-left">
                <h2 className="font-bold text-2xl mb-2">Company</h2>
                <ul className="text-river-bed-100 grid gap-1 capitalize">
                  <li className="hover:text-white underline transition duration-150">
                    <Link to="/terms">Terms & conditions</Link>
                  </li>
                  <li className="hover:text-white underline transition duration-150">
                    Privacy policy
                  </li>
                  <li className="hover:text-white underline transition duration-150">
                    Careers
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-center md:text-left">
                <h2 className="font-bold text-2xl mb-2">Services</h2>
                <ul className="text-river-bed-100 grid gap-1 capitalize">
                  <li className="hover:text-white underline transition duration-150">
                    Car rentals
                  </li>
                  <li className="hover:text-white underline transition duration-150">
                    Personal car listing for rent
                  </li>
                  <li className="hover:text-white underline transition duration-150">
                    Partnership
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h2 className="font-bold text-2xl mb-2 text-center md:text-left">
                  Get in touch.
                </h2>
                <div className="items-center justify-center md:justify-start flex gap-6">
                  <a href="https://www.facebook.com/" target="_blank">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      width="35"
                      height="35"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/" target="_blank">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="35"
                      height="35"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://x.com/" target="_blank">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-twitter-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                  </a>
                </div>
                <div className="justify-center md:justify-start items-center flex mt-3">
                  <Link
                    to="/aboutus"
                    className="text-ecstasy-500 text-l border-solid border-2 border-ecstasy-500 px-2  font-thin rounded-lg transition duration-150 shadow-md  hover:bg-ecstasy-600  hover:text-amber-50 active:bg-ecstasy-700"
                  >
                    About us
                  </Link>
                  <Link
                    to="/contact"
                    className="text-ecstasy-500 text-l border-solid border-2  border-ecstasy-500 px-2  mx-2 font-thin rounded-lg  transition duration-150 shadow-md  hover:bg-ecstasy-600 hover:text-amber-50  active:bg-ecstasy-700"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center py-6">
        <p className="text-xs text-river-bed-100">
          2024 &copy; VCS Rentals. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
