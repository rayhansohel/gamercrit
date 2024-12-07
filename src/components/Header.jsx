import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex gap-2 mx-auto w-11/12">
      <div className="flex lg:hidden gap-2 bg-base-200 p-3 items-center justify-center rounded-box">
        <div>
          <Dropdown />
        </div>
      </div>
      {/* load navbar here */}
      <div className="flex-grow">
        <Navbar />
      </div>
      <div className="flex gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
