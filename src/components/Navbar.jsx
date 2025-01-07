import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import MenuItems from "./MenuItems";
import BrandLogo from "../assets/gamercrit_logo.png";
import { Tooltip } from "react-tooltip";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="navbar">
        <Lottie animationData={loadingAnimation} className="w-32" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-base-200/70 backdrop-blur rounded-xl h-12 px-3 flex justify-center xl:justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link to="/">
            <div className="flex gap-1 items-center justify-center">
              <img src={BrandLogo} alt="Brand Logo" className="w-8" />
              <h1 className="text-lg font-poppins font-bold uppercase tracking-wider">
                Gamer Crit
              </h1>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="hidden xl:grid grid-flow-col-dense gap-2">
          <MenuItems />
        </div>

        {/* Login or register buttons */}
        <div className="hidden xl:flex space-x-2">
          <div>
            {user && user?.email ? (
              <>
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/"
                    onClick={logOut}
                    type="button"
                    className="btn btn-sm btn-primary border-none shadow-none hover:text-accent"
                  >
                    <span>Logout</span>
                  </NavLink>
                  <div className="avatar cursor-pointer">
                    <div className="w-7">
                      <img
                        src={user.photoURL || defaultAvatar}
                        alt="User Avatar"
                        className="rounded-full"
                        data-tooltip-id="theme-tooltip"
                        data-tooltip-content={`${user.displayName}`}
                      />
                    </div>
                    {/* Tooltip Component */}
                    <Tooltip />
                  </div>
                </div>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                type="button"
                className="btn btn-sm shadow-none"
              >
                <span>Login</span>
              </NavLink>
            )}
          </div>
          {/* Conditionally hide Register button if user is logged in */}
          {!user && (
            <NavLink
              to="/auth/register"
              type="button"
              className="btn btn-sm btn-primary shadow-none"
            >
              <span>Register</span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
