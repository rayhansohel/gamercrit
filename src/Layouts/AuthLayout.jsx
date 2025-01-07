import { Outlet } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Dropdown from "../components/Dropdown";

const AuthLayout = () => {

  return (
    <div className="text-sm min-h-screen">
      {/* load auth pages here */}
      <Outlet />
      {/* Theme Toggle buttons */}
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      {/* Mobile Dropdown Menu */}
      <div className="lg:hidden fixed top-4 left-4">
        <Dropdown />
      </div>
    </div>
  );
};

export default AuthLayout;