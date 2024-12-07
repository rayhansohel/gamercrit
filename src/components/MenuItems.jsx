import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import NeedLoginModal from "./NeedLoginModal";

const MenuItems = ({ closeDropdown }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState("");

  // Function to handle private links when the user is not logged in
  const handlePrivateLinkClick = (e, redirectTo) => {
    if (!user || !user.email) {
      e.preventDefault(); // Prevent navigation if not logged in
      setRedirectPath(redirectTo); // Store the target path
      setIsModalOpen(true); // Open the modal
    }
  };

  // Function to redirect to the login page
  const handleRedirectToLogin = () => {
    localStorage.setItem("redirectTo", redirectPath); // Store the target path
    navigate("/auth/login"); // Redirect to the login page
    setIsModalOpen(false); // Close the modal
  };

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

      {/* Conditionally render private links */}
      <NavLink
        to="/add-review"
        onClick={(e) => handlePrivateLinkClick(e, "/add-review")}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-base-100 shadow-none ${
            isActive ? "text-pink-600" : "hover:text-pink-600 transition"
          }`
        }
      >
        Add Review
      </NavLink>

      <NavLink
        to="/my-reviews"
        onClick={(e) => handlePrivateLinkClick(e, "/my-reviews")}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-base-100 shadow-none ${
            isActive ? "text-pink-600" : "hover:text-pink-600 transition"
          }`
        }
      >
        My Reviews
      </NavLink>

      <NavLink
        to="/watch-list"
        onClick={(e) => handlePrivateLinkClick(e, "/watch-list")}
        className={({ isActive }) =>
          `btn btn-sm w-full bg-base-100 shadow-none ${
            isActive ? "text-pink-600" : "hover:text-pink-600 transition"
          }`
        }
      >
        Watch List
      </NavLink>

      {/* Modal to handle redirect to login */}
      <NeedLoginModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRedirect={handleRedirectToLogin}
      />
    </>
  );
};

export default MenuItems;
