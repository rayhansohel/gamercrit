/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const MenuItems = ({ closeDropdown }) => {
  const { user } = useContext(AuthContext);

  const handlePrivateLinkClick = (e) => {
    if (!user || !user.email) {
      e.preventDefault();
      return;
    }
    closeDropdown();
  };

  return (
    <>
      <NavLink
        to="/"
        onClick={closeDropdown}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-transparent border-none shadow-none ${
            isActive ? "text-accent" : "hover:text-accent transition"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/reviews"
        onClick={closeDropdown}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-transparent border-none shadow-none ${
            isActive ? "text-accent" : "hover:text-accent transition"
          }`
        }
      >
        Reviews
      </NavLink>

      {/* Conditional Menu Items */}
      {user && user.email ? (
        <>
          <NavLink
            to="/add-review"
            onClick={(e) => handlePrivateLinkClick(e, "/add-review")}
            className={({ isActive }) =>
              `btn btn-sm bg-transparent border-none shadow-none w-full ${
                isActive ? "text-accent" : "hover:text-accent transition"
              }`
            }
          >
            Add Review
          </NavLink>

          <NavLink
            to="/my-reviews"
            onClick={(e) => handlePrivateLinkClick(e, "/my-reviews")}
            className={({ isActive }) =>
              `btn btn-sm bg-transparent border-none shadow-none w-full ${
                isActive ? "text-accent" : "hover:text-accent transition"
              }`
            }
          >
            My Reviews
          </NavLink>

          <NavLink
            to="/watchlist"
            onClick={(e) => handlePrivateLinkClick(e, "/watch-list")}
            className={({ isActive }) =>
              `btn btn-sm bg-transparent border-none shadow-none w-full ${
                isActive ? "text-accent" : "hover:text-accent transition"
              }`
            }
          >
            Watch List
          </NavLink>
        </>
      ) : null}

      <NavLink
        to="/about"
        onClick={closeDropdown}
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
        onClick={closeDropdown}
        className={({ isActive }) =>
          `btn btn-sm bg-transparent border-none shadow-none w-full ${
            isActive ? "text-accent" : "hover:text-accent transition"
          }`
        }
      >
        Contact Us
      </NavLink>
    </>
  );
};

export default MenuItems;
