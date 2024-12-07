import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import MenuItems from "./MenuItems";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown if click is outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="btn btn-sm shadow-none h-8 w-10"
      >
        {isOpen ? (
          <span className="text-2xl">
            <IoClose />
          </span>
        ) : (
          <span className="text-2xl">
            <HiMenu />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="text-sm absolute top-16 -left-3  w-[300px] ">
          <div className="flex p-5 bg-base-200 rounded-box">
            <div>
              <div className="space-y-2">
                {!user && (
                  <NavLink
                    to="/auth/register"
                    type="button"
                    onClick={closeDropdown}
                    className="btn btn-sm w-full bg-base-100 shadow-none"
                  >
                    <span>Register</span>
                  </NavLink>
                )}

                <div>
                  {user && user?.email ? (
                    <>
                      <div className="flex flex-col items-center">
                        <div className="avatar mb-2">
                          <div className="w-28">
                            <img
                              src={user.photoURL || defaultAvatar}
                              alt="User Avatar"
                              className="rounded-xl"
                            />
                          </div>
                        </div>

                        <NavLink
                          to="/"
                          onClick={() => {
                            logOut();
                            closeDropdown();
                          }}
                          type="button"
                          className="btn btn-sm w-full bg-base-100 shadow-none"
                        >
                          <span>Logout</span>
                        </NavLink>
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to="/auth/login"
                      type="button"
                      onClick={closeDropdown}
                      className="btn btn-sm bg-base-100 shadow-none text-pink-600 w-full"
                    >
                      <span>Login</span>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="space-y-2">
              {/* Pass closeDropdown to MenuItems */}
              <MenuItems closeDropdown={closeDropdown} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
