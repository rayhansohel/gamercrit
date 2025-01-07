import { Helmet } from "react-helmet-async";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import BrandLogoLight from "../assets/gamercrit_logo.png";
import BrandLogoDark from "../assets/gamercrit_logo.png";
import ThemeContext from "../contexts/ThemeContext";
import { useContext } from "react";

const Login = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-300">
      <Helmet>
        <title>Login - Gamer Crit</title>
      </Helmet>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className=" bg-login w-full h-screen bg-cover bg-center hidden lg:flex justify-center items-center gap-4 flex-col">
          <div className="w-full bg-black/50 backdrop-blur-sm h-full flex flex-col items-center justify-center gap-4">
            {/* Brand Logo */}
            <div className="flex items-center">
              <Link to="/">
                <div className="flex items-center justify-center">
                  <img src={BrandLogoLight} alt="Brand Logo" className="w-96" />
                </div>
              </Link>
            </div>
            <div>
              <Link to="/">
                <button className="btn btn-sm btn-primary">Go Back Home</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div>
            <Link to="/">
              <div className="flex lg:hidden items-center justify-center mb-10">
                <img
                  src={theme === "dark" ? BrandLogoLight : BrandLogoDark}
                  alt="Brand Logo"
                  className="w-40"
                />
              </div>
            </Link>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
