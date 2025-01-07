import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../assets/404.json";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Error 404 - Gamer Crit</title>
      </Helmet>
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center px-4 text-center font-poppins bg-base-300">
        <Lottie animationData={loginAnimation} className="w-60 mb-10" />
        <p className="text-sm -mt-10">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="btn btn-sm mt-4 btn-accent  text-white border-none shadow-none">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
