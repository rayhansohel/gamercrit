import MenuItems from "./MenuItems";
import { Link } from "react-router-dom";
import BrandLogo from "../assets/gamercrit_logo.png";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  return (
    <div>
      <div className="space-y-4">
        <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-4">
          <div className="bg-base-200 rounded-box p-6 md:col-span-2 xl:col-span-1">
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

          <div className="bg-base-200 rounded-box p-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Stay Updated</h2>
              <p className="mb-2">
                Subscribe to our newsletter for the latest game reviews,
                insights, updates, and exclusive gaming tips delivered straight
                to your inbox!
              </p>
              <div className="flex w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 p-2 rounded-l-md focus:outline-none"
                />
                <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="bg-base-200 rounded-box p-6">
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
        <div className="w-11/12 m-auto bg-base-100 rounded-box py-2 px-4 h-16 flex justify-center items-center">
          <p className="text-sm">
            © {new Date().getFullYear()}. Gamer Crit. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
