import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <Helmet>
        <title>Error 404 - Grone</title>
      </Helmet>
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center px-4 text-center font-poppins bg-base-300">
        <h1 className="text-[150px]">
          404
        </h1>
        <p className="text-sm -mt-10">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="btn btn-sm mt-4 bg-pink-600 hover:bg-pink-700 text-white shadow-none">
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
