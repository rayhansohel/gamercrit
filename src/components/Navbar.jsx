import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import MenuItems from "./MenuItems";
import BrandLogo from "../assets/gamercrit_logo.png";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  console.log(user);
  if (loading) {
    return (
      <div className="navbar">
        {/* You can add a loading spinner or a placeholder */}
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="navbar bg-base-200 border border-base-100 rounded-box px-4 flex justify-center">
        {/* Brand Logo */}
        <div className="lg:navbar-start flex items-center">
          <Link to="/">
            <div className="flex items-center justify-center">
              <img src={BrandLogo} alt="Brand Logo" className="w-10" />
              <h1 className="text-xl font-semibold uppercase">Gamer Crit</h1>
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <div className="navbar-center hidden lg:grid grid-flow-col-dense gap-2">
          <MenuItems />
        </div>

        {/* Login or register buttons */}
        <div className="hidden lg:flex navbar-end space-x-2">
          {/* Conditionally hide Register button if user is logged in */}
          {!user && (
            <NavLink
              to="/auth/register"
              type="button"
              className="btn btn-sm bg-base-100 shadow-none hover:text-pink-600"
            >
              <span>Register</span>
            </NavLink>
          )}

          <div>
            {user && user?.email ? (
              <>
                <div className="flex items-center gap-2">
                  <NavLink
                    to="/"
                    onClick={logOut}
                    type="button"
                    className="btn btn-sm bg-base-100 shadow-none hover:text-pink-600"
                  >
                    <span>Logout</span>
                  </NavLink>
                  <div className="avatar cursor-pointer">
                    <div className="w-9">
                      <img
                        src={user.photoURL || defaultAvatar}
                        alt="User Avatar"
                        className="rounded-full"
                        data-tooltip-id="theme-tooltip"
                        data-tooltip-content={`${user.displayName}`}
                      />
                    </div>
                    {/* Tooltip Component */}
                    <Tooltip/>
                  </div>
                </div>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                type="button"
                className="btn btn-sm bg-base-100 shadow-none text-pink-600"
              >
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
