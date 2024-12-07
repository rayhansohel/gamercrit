import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const MenuItems = ({ closeDropdown }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <NavLink
        to="/"
        onClick={closeDropdown}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-base-100 shadow-none ${
            isActive ? "text-pink-600" : "hover:text-pink-600 transition"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/reviews"
        onClick={closeDropdown}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-base-100 shadow-none ${
            isActive ? "text-pink-600" : "hover:text-pink-600 transition"
          }`
        }
      >
        All Reviews
      </NavLink>

      {/* Conditionally render the Profile link if the user is logged in */}
      {user && user?.email && (
        <NavLink
          to="/add-review"
          onClick={closeDropdown}
          className={({ isActive }) =>
            `btn btn-sm w-full bg-base-100 shadow-none ${
              isActive ? "text-pink-600" : "hover:text-pink-600 transition"
            }`
          }
        >
          Add Review
        </NavLink>
      )}

      {user && user?.email && (
        <NavLink
          to="/my-reviews"
          onClick={closeDropdown}
          className={({ isActive }) =>
            `btn btn-sm w-full bg-base-100 shadow-none ${
              isActive ? "text-pink-600" : "hover:text-pink-600 transition"
            }`
          }
        >
          My Review
        </NavLink>
      )}

      {user && user?.email && (
        <NavLink
          to="/watch-list"
          onClick={closeDropdown}
          className={({ isActive }) =>
            `btn btn-sm w-full bg-base-100 shadow-none ${
              isActive ? "text-pink-600" : "hover:text-pink-600 transition"
            }`
          }
        >
          Watch List
        </NavLink>
      )}
    </>
  );
};

export default MenuItems;
