import { Link, NavLink } from "react-router-dom";
import BrandLogo from "../assets/gamercrit_logo.png";
import SocialLinks from "./SocialLinks";


const Footer = () => {
  return (
    <div>
      <div className="container w-11/12 mx-auto space-y-4">
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          <div className="bg-base-100 rounded-box p-6 md:col-span-2 xl:col-span-1 flex flex-col items-center text-center xl:items-start xl:text-start">
            <div className="flex items-center mb-2">
              <Link to="/">
                <div className="flex items-center justify-center col-span-2">
                  <img src={BrandLogo} alt="Brand Logo" className="w-12" />
                  <h1 className="text-2xl font-semibold uppercase">
                    Gamer Crit
                  </h1>
                </div>
              </Link>
            </div>
            <div>
              <p>
                Explore honest, in-depth reviews, expert tips, and engaging
                insights on your favorite games, guiding you through levels,
                unraveling secrets, and enhancing your gaming experience!
              </p>
            </div>
          </div>

          <div className="bg-base-100 rounded-box p-6">
            <div>
              <h2 className="text-xl text-center font-semibold mb-4">Usefu Links</h2>
              {/* Menu Items */}
              <NavLink
                to="/reviews"
                className={({ isActive }) =>
                  `btn btn-sm w-full bg-transparent border-none shadow-none ${
                    isActive ? "text-accent" : "hover:text-accent transition"
                  }`
                }
              >
                Reviews
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `btn btn-sm bg-transparent border-none shadow-none w-full ${
                    isActive ? "text-accent" : "hover:text-accent transition"
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `btn btn-sm bg-transparent border-none shadow-none w-full ${
                    isActive ? "text-accent" : "hover:text-accent transition"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>
          </div>
          <div className="bg-base-100 rounded-box p-6 flex flex-col items-center text-center xl:items-start xl:text-start">
            <div>
              <h2 className="text-xl font-semibold pb-3">Social links</h2>
              <p className="mb-2">
                Connect with us on social media to stay updated with the latest
                reviews, gaming trends, and community insights every day!
              </p>
            </div>
            <SocialLinks />
          </div>
        </div>
        <div className="bg-base-100 rounded-box py-2 px-4 h-12 flex justify-center items-center">
          <p className="text-sm">
          {new Date().getFullYear()}{" "}

            <span> © All rights reserved by </span>
            <Link to="/" className="text-accent font-semibold">
              Gamer Crit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
