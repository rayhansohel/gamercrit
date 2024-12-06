import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { TbLogin2, TbLogout2, TbWriting } from "react-icons/tb";
import { useContext } from "react";
import defaultAvatar from "../assets/default-avatar.png";
import { AuthContext } from "../contexts/AuthContext";
import MenuItems from "./MenuItems";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="btn btn-sm border border-base-300 bg-base-100 shadow-none text-pink-600 rounded-full h-10 w-10"
      >
        {isOpen ? (
          <span className="text-xl">
            <IoClose />
          </span>
        ) : (
          <span className="text-xl">
            <HiMenu />
          </span>
        )}
      </button>

      {isOpen && (
        <div className="text-sm absolute top-16 -left-3  w-[300px] ">
          <div className="flex p-5 bg-base-300 rounded-box">
            <div>
              <div className="space-y-2 w-32">
                {!user && (
                  <NavLink
                    to="/auth/register"
                    type="button"
                    onClick={closeDropdown}
                    className="btn btn-sm w-full border border-base-300 shadow-none"
                  >
                    <TbWriting className="text-xl" />
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
                          className="btn btn-sm w-full border border-base-300 shadow-none"
                        >
                          <TbLogout2 className="text-lg" />
                          <span>Logout</span>
                        </NavLink>
                      </div>
                    </>
                  ) : (
                    <NavLink
                      to="/auth/login"
                      type="button"
                      onClick={closeDropdown}
                      className="btn btn-sm border border-base-300 shadow-none text-pink-600 w-full"
                    >
                      <TbLogin2 className="text-lg" />
                      <span>Login</span>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="space-y-2">
              <MenuItems />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
