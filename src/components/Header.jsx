import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex gap-2 container mx-auto w-11/12">
      <div className="xl:hidden">
        <Dropdown />
      </div>
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
