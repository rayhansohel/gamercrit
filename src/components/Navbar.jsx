import { Link, NavLink } from "react-router-dom";
import { TbLogin2, TbLogout2, TbWriting } from "react-icons/tb";
import { useContext } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import MenuItems from "./MenuItems";
import BrandLogo from "../assets/gamercrit_logo.png";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

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
      <div className="navbar bg-base-200 rounded-box px-4">
        {/* Brand Logo */}
        <div className="navbar-start flex gap-1 items-center">
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
              className="btn btn-sm border border-base-300 shadow-none hover:text-pink-600"
            >
              <TbWriting className="text-lg" />
              <span>Register</span>
            </NavLink>
          )}

          <div>
            {user && user?.email ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-8">
                      <img
                        src={user.photoURL || defaultAvatar}
                        alt="User Avatar"
                        className="rounded-box -2 -gray-800"
                      />
                    </div>
                  </div>
                  <NavLink
                    to="/"
                    onClick={logOut}
                    type="button"
                    className="btn btn-sm border border-base-300 shadow-none hover:text-pink-600"
                  >
                    <TbLogout2 className="text-lg -ml-1" />
                    <span>Logout</span>
                  </NavLink>
                </div>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                type="button"
                className="btn btn-sm border border-base-300 shadow-none text-pink-600"
              >
                <TbLogin2 className="text-lg -ml-1" />
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
