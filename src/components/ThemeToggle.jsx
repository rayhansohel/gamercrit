import { Tooltip } from "react-tooltip";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  // Handle theme toggle
  const handleThemeChange = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center">
      <button
        className="w-16 h-16 rounded-box bg-base-200 border border-base-100 flex items-center justify-center"
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={`${theme === "dark" ? "Light" : "Dark"} Mode`}
        onClick={handleThemeChange}
      >
        {theme === "dark" ? (
          <HiSun className="text-white text-3xl" />
        ) : (
          <HiMoon className="text-black text-3xl" />
        )}
      </button>
      {/* Tooltip Component */}
      <Tooltip
        id="theme-tooltip"
        place="bottom"
        style={{
          backgroundColor: "#1D232A",
          color: "#ffffff",
          padding: "8px 20px",
          borderRadius: "10px",
        }}
      />
    </div>
  );
};

export default ThemeToggle;
